import React, { useState } from "react"
import logo from "/images/Logo-RiceVision.webp"

const Navbar = ({ onOpenRegister }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b">
      <div className="mx-auto max-w-[320px] md:max-w-7xl px-3 py-2 flex items-center justify-between">

        <img src={logo} alt="RiceVision" className="h-6 md:h-12" />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium dark:text-white">
          <a href="#info">Overview</a>
          <a href="#mission">Mission</a>
          <a href="#goal">Goal</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRegister}
            className="hidden md:inline bg-green-700 text-white px-5 py-2 rounded text-sm"
          >
            Get Started
          </button>

          <button
            className="md:hidden text-base"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mx-auto max-w-[320px] px-3 pb-3 space-y-2 text-[11px]">
          <a href="#info" className="block">Overview</a>
          <a href="#mission" className="block">Mission</a>
          <a href="#goal" className="block">Goal</a>
          <a href="#features" className="block">Features</a>
          <a href="#contact" className="block">Contact</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar