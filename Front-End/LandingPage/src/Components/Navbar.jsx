import React, { useState } from 'react'

const Navbar = ({ onOpenRegister }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 relative w-full flex items-center justify-between px-4 md:px-10 py-2 shadow-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">

      <div className="flex items-center gap-2">
        <img src="src/assets/Logo-RiceVision.png" className='w-auto h-10 md:h-12' alt="RiceVision logo" />
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
        <a href="#info" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 
           hover:text-green-700 dark:hover:text-green-400">Overview</a>
        <a href="#mission" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 
           hover:text-green-700 dark:hover:text-green-400">Mission</a>
        <a href="#goal" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 
           hover:text-green-700 dark:hover:text-green-400">Goal</a>
        <a href="#features" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 
           hover:text-green-700 dark:hover:text-green-400">Features</a>
        <a href="#contact" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 
           hover:text-green-700 dark:hover:text-green-400">Contact Us</a>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => { setMenuOpen(false); onOpenRegister?.() }}
          className="hidden md:inline bg-green-700 dark:bg-green-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-green-800 dark:hover:bg-green-700"
        >
          Register
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden p-2 rounded-md focus:outline-none text-slate-800 dark:text-slate-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden absolute left-0 right-0 top-full z-50 border-t bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md transition-all duration-200 ease-in-out overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 gap-4 text-sm font-semibold">
          <a href="#info" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400">Overview</a>
          <a href="#mission" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400">Mission</a>
          <a href="#goal" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400">Goal</a>
          <a href="#features" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400">Features</a>
          <a href="#contact" onClick={handleLinkClick} className="text-slate-800 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400">Contact Us</a>

          <button
            onClick={() => { setMenuOpen(false); onOpenRegister?.() }}
            className="bg-green-700 dark:bg-green-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-green-800 dark:hover:bg-green-700"
          >
            Register
          </button>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
