import React from 'react'
import Header from './Components/Navbar/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-slate-900 transition-all duration-500 overflow-hidden'>
      <Header />

      <div className="flex pt-8"> 
        {/* Sidebar */}
        <Sidebar />

        {/* Routed Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App