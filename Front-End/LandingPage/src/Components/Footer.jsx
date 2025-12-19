import React from "react";

// Example SVG icons — replace these with your preferred icon library
const socialIcons = [
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><path d="M21 21H3V3h18v18Zm-8-3v-6H8.5v-2H13v-2.5h-2V8h2V7a2 2 0 1 1 4 0v1h2v2h-2V9a.5.5 0 0 0-.5.5V11h2v2h-2v6H13ZM9 20h6V10H9v10Z"/></svg> },
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="4"/><text x="8" y="16" fontSize="10" fill="#fff">in</text></svg> },
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="8"/><text x="10" y="16" fontSize="10" fill="#fff">@</text></svg> },
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10"/><text x="7" y="17" fontSize="10" fill="#fff">f</text></svg> },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-md py-10 px-4 sm:px-6 lg:px-8 mt-16 mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        
        {/* Brand & Social Section */}
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-900 dark:text-white text-3xl font-bold">RiceVision</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-sm leading-relaxed">
            Conserving the lands and waters <br />
            on which all life depends.
          </p>

          <div className="flex space-x-4 mb-8">
            {socialIcons.map((icon, idx) => (
              <a key={idx} href={icon.href} className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition" aria-label={`Social ${idx}`}>
                {icon.icon}
              </a>
            ))}
          </div>

          <button
            className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-2 rounded-lg flex space-x-2 items-center transition"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 12V4M4 8l4-4 4 4"/></svg>
            <span>BACK TO TOP</span>
          </button>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Site Map</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><a href="#info" className="hover:text-green-600 dark:hover:text-green-400 transition">Homepage</a></li>
            <li><a href="#mission" className="hover:text-green-600 dark:hover:text-green-400 transition">Mission</a></li>
            <li><a href="#goal" className="hover:text-green-600 dark:hover:text-green-400 transition">Goal</a></li>
            <li><a href="#features" className="hover:text-green-600 dark:hover:text-green-400 transition">Features</a></li>
            <li><a href="#contact" className="hover:text-green-600 dark:hover:text-green-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Legal</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><a href="/privacy-policy" className="hover:text-green-600 dark:hover:text-green-400 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-green-600 dark:hover:text-green-400 transition">Terms of Services</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 dark:bg-gray-800 mt-10 rounded-b-3xl text-center py-4 px-4 text-gray-700 dark:text-gray-300 text-sm border-t border-gray-200 dark:border-gray-700">
        Copyright © {new Date().getFullYear()}, ataraxis.ai, All Rights Reserved.
      </div>
    </footer>
  );
}


