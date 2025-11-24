import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './Components/Hero';
import Info from './Components/Info';
import Mission from './Components/Mission';
import Goals from './Components/Goals';
import Features from './Components/Features';
import Contact from './Components/Contact';
import Register from './Components/Register';
import Footer from './Components/Footer';
import SplashScreen from './Components/SplashScreen';

function App() {
  // Splash screen state
  const [loading, setLoading] = useState(true);

  // Modal state
  const [openRegister, setOpenRegister] = useState(false);
  const [mountedModal, setMountedModal] = useState(false);

  // Modal entrance animation
  useEffect(() => {
    if (!openRegister) return;
    const t = setTimeout(() => setMountedModal(true), 20);
    return () => {
      clearTimeout(t);
      setMountedModal(false);
    };
  }, [openRegister]);

  // Scroll lock when modal is open
  useEffect(() => {
    let scrollY = 0;
    const prevPaddingRight = document.body.style.paddingRight || '';

    if (openRegister) {
      scrollY = window.scrollY || window.pageYOffset;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = prevPaddingRight;

      if (openRegister) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [openRegister]);

  return (
    <>
      {/* SPLASH SCREEN */}
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}

      {/* MAIN APP */}
      {!loading && (
        <>
          <Navbar onOpenRegister={() => setOpenRegister(true)} />

          <Hero />
          <Info />
          <Mission />
          <Goals />
          <Features />
          <Contact />
          <Footer />

          {/* MODAL */}
          {openRegister && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setOpenRegister(false)}
              style={{ opacity: mountedModal ? 1 : 0, transition: 'opacity 200ms ease-out' }}
            >
              <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
                onClick={(e) => e.stopPropagation()}
                style={{
                  opacity: mountedModal ? 1 : 0,
                  transform: mountedModal ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
                  transition: 'opacity 200ms ease-out, transform 200ms ease-out',
                }}
              >
                <button
                  onClick={() => setOpenRegister(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                >
                  ✕
                </button>

                <Register />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
