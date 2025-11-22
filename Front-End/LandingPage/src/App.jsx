import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Info from './Components/Info'
import Mission from './Components/Mission'
import Goals from './Components/Goals'
import Features from './Components/Features'
import Register from './Components/Register'
import Footer from './Components/Footer'

function App() {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <>
      <Navbar onOpenRegister={() => setOpenRegister(true)} />

      <Hero />
      <Info />
      <Mission />
      <Goals />
      <Features />
      <Footer />

      {/* MODAL */}
{openRegister && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 
               animate-fadeIn"
    onClick={() => setOpenRegister(false)}
  >
    <div
      className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative
                 animate-zoomIn"
      onClick={(e) => e.stopPropagation()}
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
  )
}

export default App
