import React from "react";

// Example SVG icons — replace these with your preferred icon library
const socialIcons = [
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><path d="M21 21H3V3h18v18Zm-8-3v-6H8.5v-2H13v-2.5h-2V8h2V7a2 2 0 1 1 4 0v1h2v2h-2V9a.5.5 0 0 0-.5.5V11h2v2h-2v6H13ZM9 20h6V10H9v10Z"/></svg> }, // Example icon (replace with your own)
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="4"/><text x="8" y="16" fontSize="10" fill="#fff">in</text></svg> }, // LinkedIn
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="8"/><text x="10" y="16" fontSize="10" fill="#fff">@</text></svg> }, // Instagram
  { href: "#", icon: <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10"/><text x="7" y="17" fontSize="10" fill="#fff">f</text></svg> }, // Facebook
];

export default function Footer() {
  return (
    <footer className="bg-green-700 rounded-3xl shadow-md py-10 px-6 mx-6 mt-16 mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
       
        <div>
         
          <div className="flex items-center space-x-2 mb-4">
            {/* Add the logo */}
            <span className="text-black-500 text-3xl font-bold"></span>
            <span className="text-white text-xl font-semibold tracking-wider">AgriVision</span>
          </div>
          <p className="text-gray-100 mb-8">
            Conserving the lands and waters <br />
            on which all life depends. 
          </p>

          
          <div className="flex space-x-4 mb-8">
            {socialIcons.map((icon, idx) => (
              <a key={idx} href={icon.href} className="text-white hover:text-green-700 transition" aria-label={`Social ${idx}`}>
                {icon.icon}
              </a>
            ))}
          </div>

          
          <button
            className="border border-gray-100 text-gray-100 px-6 py-2 rounded-lg mt-1 flex space-x-2 items-center hover:bg-teal-800 transition"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <svg className="mr-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 12V4M4 8l4-4 4 4"/></svg>
            <span>BACK TO TOP</span>
          </button>
        </div>

       
        <div>
          <h3 className="font-bold text-white mb-4">Site Map</h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/" className="underline">Homepage</a></li>
            <li><a href="/Mission">Mission</a></li>
            <li><a href="/Goal">Goal</a></li>
            <li><a href="/Features">Features</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-bold text-black mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-100">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Services</a></li>
          </ul>
        </div>
      </div>

      
      <div className="bg-green-700 mt-10 rounded-b-3xl text-center py-2 text-gray-800 text-sm">
        Copyright © {new Date().getFullYear()}, ataraxis.ai, All Rights Reserved.
      </div>
    </footer>
  );
}

