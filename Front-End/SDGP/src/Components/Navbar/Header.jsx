import React from 'react'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <nav className='fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
            <div className='flex justify-between items-center h-14 '>
                {/* Logo */}
                <div className='flex items-center space-x-1 group cursor-pointer'>
                    <span className="material-symbols-outlined text-green-600" style={{fontSize:'30px'}}>eco</span>
                    <span className='text-lg sm:text-xl md:text-2xl font-medium'>
                        <span className='text-green-600'>Agri</span>
                        <span className='text-yellow-400'>Vision </span>
                    </span>
                </div>
                          {/* Center search (grow to take available space) */}
          <div className="flex-1 px-4 hidden md:flex items-center">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* left icon */}
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                style={{ fontSize: 20 }}
                aria-hidden
              >
                search
              </span>

              <input
                type="text"
                aria-label="Search"
                placeholder="Search anything..."
                className="w-full pl-10 pr-36 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />

              {/* right actions: filter button + shortcut hint */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button
                  type="button"
                  title="Filter"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:shadow transition"
                >
                  <span
                    className="material-symbols-outlined text-slate-600"
                    style={{ fontSize: 18 }}
                    aria-hidden
                  >
                    tune
                  </span>
                  <span className="text-sm text-slate-600">Filter</span>
                </button>

              </div>
            </div>
          </div>

                {/* Header Links */}
                <div className='flex items-center space-x-6 lg:space-x-8 mt-2'>
                    {/* Language */}
                    <a href="#Language">
                        <span className="material-symbols-outlined text-gray-800 hover:text-black leading-none" style={{fontSize:'22px'}}>language</span>
                    </a>

                    {/* Notifications */}
                    <a href="#Language">
                        <span className="material-symbols-outlined text-gray-800 hover:text-black leading-none" style={{fontSize:'22px'}}>notifications</span>
                    </a>

                    {/* Profile */}
                    <a href="#Language">
                        <span className="material-symbols-outlined text-gray-800 hover:text-black leading-none" style={{fontSize:'22px'}}>contacts_product</span>
                    </a>
                        
                </div>

                

            </div>
        </div>
    </nav>
  )
}

export default Header