import React from 'react'


const Header = () => {
  return (
    <nav className='fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
            <div className='flex justify-between items-center h-14 '>
                <div className='flex items-center space-x-1 group cursor-pointer'>
                    <span className="material-symbols-outlined text-green-600" style={{fontSize:'30px'}}>eco</span>
                    <span className='text-lg sm:text-xl md:text-2xl font-medium'>
                        <span className='text-green-600'>Agri</span>
                        <span className='text-yellow-400'>Vision </span>
                    </span>
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