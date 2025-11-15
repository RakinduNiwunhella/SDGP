import React from 'react'

const navItems = [
  { id: 'dashboard', label: 'My Dashboard', icon: 'apps', active: true },
  { id: 'field-map', label: 'Field Map', icon: 'map', active: false },
  { id: 'field-data', label: 'Field Data', icon: 'agriculture' , active: false},
  { id: 'alerts', label: 'Alerts', icon: 'notification_important', active: false },
  { id: 'weather', label: 'Weather', icon: 'cloud' , active: false},
  { id: 'report', label: 'Report', icon: 'bar_chart', active: false },
]

const bottomItems = [
  { id: 'profile', label: 'My Profile', icon: 'person', active: false },
  { id: 'help', label: 'Help & FAQ', icon: 'help_outline' , active: false},
  { id: 'logout', label: 'Logout', icon: 'logout' },
]

const Sidebar = () => {
  return (
    <aside className="h-screen my-7 w-60 bg-white px-6 py-10 flex flex-col justify-between">
      <div>
        {/* Navigation list */}
        <nav className="flex flex-col gap-1">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-150
                ${item.active ? 'text-white bg-linear-to-r from-blue-400 to-teal-400 shadow-md' : 'text-gray-700 hover:text-black'}`}
            >
              <span className="w-8 shrink-0 flex items-center justify-center material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom grouped actions */}
      <div>
        {/* Navigation list */}
        <nav className="flex flex-col gap-1">
          {bottomItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 py-1 px-3 rounded-md transition-all duration-150
                ${item.active ? 'text-white bg-linear-to-r from-blue-400 to-teal-400 shadow-md' : 'text-gray-700 hover:text-black'}`}
            >
              <span className="w-8 shrink-0 flex items-center justify-center material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar