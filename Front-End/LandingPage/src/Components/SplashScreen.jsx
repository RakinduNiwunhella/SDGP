// SplashScreen.jsx
import React, { useEffect, useState } from "react";

export default function SplashScreen({ duration = 4000, onFinish }) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), duration - 500);
    const finishTimer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, duration);
    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading RiceVision Lanka"
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(70)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-64 h-64">
        {/* Earth */}
        <img
          src="/images/earth.png"
          alt="Earth"
          className="w-full h-full object-contain earth"
        />

        {/* Satellite orbit */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit">
            {/* Comet trail with motion blur */}
            <div className="satellite-comet" />
            <img
              src="/images/satellite.png"
              alt="Satellite"
              className="satellite"
            />
          </div>
        </div>
      </div>

      <style>{`
        .orbit {
          position: relative;
          width: 100%;
          height: 100%;
          animation: orbit-rotate 5s linear infinite;
        }

        .satellite {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          transform: translate(-50%, -50%) translateX(280px);
          animation: satellite-spin 2s linear infinite;
          z-index: 10;
        }

        .satellite-comet {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 50px;
          background: radial-gradient(ellipse at center, rgba(0,200,255,0.6) 0%, rgba(0,200,255,0) 80%);
          border-radius: 50%;
          transform: translate(-50%, -50%) translateX(280px) rotate(-45deg);
          filter: blur(12px) brightness(1.2);
          animation: comet-flicker 1.5s infinite alternate;
          z-index: 5;
        }

        @keyframes comet-flicker {
          0% { opacity: 0.3; transform: translate(-50%, -50%) translateX(280px) rotate(-45deg) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) translateX(280px) rotate(-45deg) scale(1.2); }
          100% { opacity: 0.3; transform: translate(-50%, -50%) translateX(280px) rotate(-45deg) scale(1); }
        }

        @keyframes satellite-spin {
          0% { transform: translate(-50%, -50%) translateX(280px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) translateX(280px) rotate(360deg); }
        }

        @keyframes orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .earth {
          animation: earth-pulse 3s ease-in-out infinite;
          box-shadow: 0 0 50px rgba(0, 150, 255, 0.8);
          border-radius: 50%;
        }

        @keyframes earth-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 2s infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
