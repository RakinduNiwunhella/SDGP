import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Team() {
  const people = [
    {
      name: "Rakindu Niwunhella",
      role: "Front-end Developer",
      imageUrl:
        "public/images/rakindu.png",
      github: "https://github.com/search?q=Rakindu+Niwunhella",
      linkedin: "#",
    },
    {
      name: "Sanila Wijesekara",
      role: "Designer",
      imageUrl:
        "public/images/sanila.jpg",
      github: "https://github.com/search?q=Sanila+Wijesekara",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Sanila%20Wijesekara",
    },
    {
      name: "Chethina Fernando",
      role: "Director of Product",
      imageUrl:
        "public/images/chethina.png",
      github: "https://github.com/search?q=Chethina+Fernando",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Chethina%20Fernando",
    },
    {
      name: "Binada Mathara Arachchige",
      role: "Copywriter",
      imageUrl:
        "public/images/binada.png",
      github: "https://github.com/search?q=Binada+Mathara+Arachchige",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Binada%20Mathara%20Arachchige",
    },
    {
      name: "Pavithma Fernando",
      role: "Senior Designer",
      imageUrl:
        "public/images/pavithma.jpg",
      github: "https://github.com/search?q=Pavithma+Fernando",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Pavithma%20Fernando",
    },
    {
      name: "Sithuli Basnayake",
      role: "Principal Designer",
      imageUrl:
        "public/images/sithuli.png",
      github: "https://github.com/search?q=Sithuli+Basnayake",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Sithuli%20Basnayake",
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
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 ">
          {people.map((person) => (
            <div
              key={person.name}
              className="text-center transform transition-all duration-300 ease-in hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-white p-4"
            >
              <img
                className="mx-auto h-85 w-95 object-cover rounded-lg"
                src={person.imageUrl}
                alt={person.name}
              />
              <h3 className="mt-6 text-lg font-semibold text-gray-900 ">
                {person.name}
              </h3>
              <p className="text-sm text-gray-600">{person.role}</p>

              {/* Icons */}
              <div className="mt-4 flex items-center justify-center gap-x-4">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} GitHub`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaGithub />
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} LinkedIn`}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaLinkedin />
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