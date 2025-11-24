import React from 'react'

const Navbar = ({ onOpenRegister }) => {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-0 shadow-sm bg-white">

      <div className="flex items-center gap-2">
        <span ><img src="src/assets/Logo-RiceVision.png" alt="Logo Rice Visioon" className='w-auto h-12 pt-1 my-1'/></span>
      </div>

      <div className="flex items-center gap-10 text-sm font-semibold">
        <a href="#overview" className="hover:text-green-700">Overview</a>
        <a href="#mission" className="hover:text-green-700">Mission</a>
        <a href="#goal" className="hover:text-green-700">Goal</a>
        <a href="#features" className="hover:text-green-700">Features</a>
        <a href="#contact" className="hover:text-green-700">Contact Us</a>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenRegister}
          className="bg-green-700 text-white px-6 py-2 font-semibold hover:bg-green-800 rounded-md "
        >
          Register
        </button>
      </div>

    </nav>
  )
}

export default Navbar
