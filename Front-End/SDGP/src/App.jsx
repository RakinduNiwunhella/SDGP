import React from 'react'
import Header from './Components/Navbar/Header'
import Sidebar from './Components/Sidebar/Sidebar'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-slate-900 transition-all duration-500 overflow-hidden' >
      <Header/>
      <Sidebar/>

    </div>
  )
}

export default App