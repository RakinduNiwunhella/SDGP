import React, { useState, useEffect } from 'react'
import logo from '/images/Logo-RiceVision.webp'

const Navbar = ({ onOpenRegister }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  // Default = LIGHT mode
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-10 py-2 shadow-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-10 md:h-12" alt="RiceVision logo" />
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
        <a href="#info" className="hover:text-green-700 dark:hover:text-green-400">Overview</a>
        <a href="#mission" className="hover:text-green-700 dark:hover:text-green-400">Mission</a>
        <a href="#goal" className="hover:text-green-700 dark:hover:text-green-400">Goal</a>
        <a href="#features" className="hover:text-green-700 dark:hover:text-green-400">Features</a>
        <a href="#contact" className="hover:text-green-700 dark:hover:text-green-400">Contact Us</a>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">

        {/* THEME TOGGLE BUTTON  */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-md border border-slate-300 dark:border-slate-600 
                     text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Toggle theme"
        >
          <span className="material-icons">
            {theme === 'light' ? 'brightness_2' : 'light_mode'}
          </span>
        </button>

        {/* Get Started */}
        <button
          onClick={() => { setMenuOpen(false); onOpenRegister?.() }}
          className="hidden md:inline bg-green-700 dark:bg-green-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-green-800 dark:hover:bg-green-700"
        >
          Get Started
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 p-4 space-y-4">
          <a href="#info" onClick={handleLinkClick}>Overview</a>
          <a href="#mission" onClick={handleLinkClick}>Mission</a>
          <a href="#goal" onClick={handleLinkClick}>Goal</a>
          <a href="#features" onClick={handleLinkClick}>Features</a>
          <a href="#contact" onClick={handleLinkClick}>Contact</a>

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full border py-2 rounded-md"
          >
            {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar