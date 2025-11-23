// SplashScreen.jsx
import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";

export default function SplashScreen({ duration = 4000, onFinish }) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTime = 500;

    const timer = setTimeout(() => setFade(true), duration);
    const finish = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, duration + fadeTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(finish);
    };
  }, [duration, onFinish]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ localClippingEnabled: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={0.6} />

        <Suspense fallback={null}>
          <SatelliteOutline duration={duration} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SatelliteOutline({ duration }) {
  const ref = useRef();
  const [model, setModel] = useState();
  const startTimeRef = useRef(null);

  useEffect(() => {
    const loader = new FBXLoader();
    let fbxModel;

    loader.load(
      "/models/satellite/source/satellite.fbx",
      (fbx) => {
        // Make satellite even smaller
        fbx.scale.set(0.0008, 0.0008, 0.0008);

        // Center horizontally
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        fbx.position.x -= center.x;
        fbx.position.z -= center.z;

        fbx.traverse((child) => {
          if (child.isMesh) {
            // 1️⃣ Base faint outline (full satellite, low opacity)
            const baseEdges = new THREE.EdgesGeometry(child.geometry);
            const baseLine = new THREE.LineSegments(
              baseEdges,
              new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.1, transparent: true })
            );
            baseLine.position.copy(child.position);
            baseLine.rotation.copy(child.rotation);
            baseLine.scale.copy(child.scale);
            child.parent.add(baseLine);

            // 2️⃣ Animated outline (bottom → top reveal)
            const revealEdges = new THREE.EdgesGeometry(child.geometry);
            const revealLine = new THREE.LineSegments(
              revealEdges,
              new THREE.LineBasicMaterial({
                color: 0x000000,
                clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), -1)],
                clipShadows: true,
              })
            );
            revealLine.position.copy(child.position);
            revealLine.rotation.copy(child.rotation);
            revealLine.scale.copy(child.scale);
            child.parent.add(revealLine);

            child.visible = false; // hide original mesh
          }
        });

        fbxModel = fbx;
        setModel(fbx);
        startTimeRef.current = null;
      },
      undefined,
      (err) => console.error("FBX load error:", err)
    );

    return () => {
      if (fbxModel) {
        fbxModel.traverse((child) => {
          if (child.isMesh) child.geometry.dispose();
        });
        setModel(null);
      }
    };
  }, []);

  useFrame((state) => {
    if (!ref.current || !model) return;

    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime;

    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const t = Math.min(elapsed / (duration / 1000), 1);

    // Rotation
    ref.current.rotation.y += 0.01;

    // Animate plane constant bottom → top for reveal lines
    const minY = -1;
    const maxY = 1;
    const revealY = minY + (maxY - minY) * t;

    ref.current.traverse((child) => {
      if (child.isLine && child.material.clippingPlanes) {
        const plane = child.material.clippingPlanes[0];
        plane.constant = revealY;
      }
    });
  });

  return model ? (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  ) : null;
}
