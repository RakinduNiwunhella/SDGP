import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


// Example SVG icons — replace these with your preferred icon library
const socialIcons = [

  {
    href: "#",
    icon: (
      <svg width="24" height="24" fill="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <text x="8" y="16" fontSize="10" fill="#fff">
          in
        </text>
      </svg>
    ),
    icon: <FaLinkedinIn size={24} />
  }, // LinkedIn
  {
    href: "#",
    icon: (
      <svg width="24" height="24" fill="currentColor">
        <circle cx="12" cy="12" r="8" />
        <text x="10" y="16" fontSize="10" fill="#fff">
          @
        </text>
      </svg>
    ),
    icon: <FaInstagram size={24} />
  }, // Instagram

];

export default function Footer() {
  return (
    <footer className="bg-green-800 rounded-3xl shadow-md pt-10 pb-0 px-6 mx-6 mt-16 mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Brand / About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            {/* Logo placeholder */}
            <span className="text-black text-3xl font-bold"></span>
            <span className="text-white text-xl font-semibold tracking-wider">
              RiceVision
            </span>
          </div>

          <p className="text-gray-100 mb-8">
            Conserving the lands and waters <br />
            on which all life depends.
          </p>

          <div className="flex space-x-4 mb-8">
            {socialIcons.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-white hover:text-green-300 transition"
                aria-label={`Social link ${idx + 1}`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="border border-gray-100 text-gray-100 px-6 py-2 rounded-lg mt-1 flex items-center hover:bg-green-500 transition"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <svg
              className="mr-1"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 12V4M4 8l4-4 4 4" />
            </svg>
            <span>BACK TO TOP</span>
          </button>
        </div>


        {/* Site Map */}
        <div className="flex flex-col gap-3 text-gray-100 text-sm font-semibold">
          <a href="#overview" className="hover:underline transition">Overview</a>
          <a href="#mission" className="hover:underline transition">Mission</a>
          <a href="#goal" className="hover:underline transition">Goal</a>
          <a href="#features" className= "hover:underline transition">Features</a>
          <a href="#contact" className= "hover:underline transition">Contact Us</a>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-100">
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Services</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-green-700 mt-10 rounded-b-3xl text-center py-2 text-gray-800 text-sm w-full px-6">
        Copyright © {new Date().getFullYear()}, RiceVision.lk, All Rights
        Reserved.
      </div>
    </footer>
  );
}

