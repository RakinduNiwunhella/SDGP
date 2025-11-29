import React from 'react'

function Team() {
  const people = [
    {
      name: "Lindsay Walton",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    },
    {
      name: "Courtney Henry",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
    {
      name: "Tom Cook",
      role: "Director of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      name: "Whitney Francis",
      role: "Copywriter",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Leonard Krasner",
      role: "Senior Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      name: "Floyd Miles",
      role: "Principal Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Our team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what we
            do and dedicated to delivering the best results for our clients.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {people.map((person) => (
            <div key={person.name} className="text-center">
              <img
                className="mx-auto h-48 w-full rounded-lg object-cover"
                src={person.imageUrl}
                alt={person.name}
              />
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm text-gray-600">{person.role}</p>

              {/* Icons */}
              <div className="mt-4 flex items-center justify-center gap-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  ✕
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  🔗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team