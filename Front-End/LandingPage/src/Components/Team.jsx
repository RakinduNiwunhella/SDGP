import React from 'react'

const people = [
  {
    name: 'Ayesha Fernando',
    role: 'Project Lead',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kamal Perera',
    role: 'Data Scientist',
    imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Nishantha Silva',
    role: 'Frontend Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1545996124-1b3e1a8f9f8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dilani Jayawardena',
    role: 'Product Designer',
    imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]

function Team() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className="h-16 w-16 rounded-full ring-1 ring-white/10"
                />
                <div>
                  <h3 className="text-base leading-7 font-semibold tracking-tight text-white">{person.name}</h3>
                  <p className="text-sm leading-6 font-semibold text-indigo-400">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Team