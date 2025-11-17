import React from "react";
import './Overview.css';

function Overview() {
  return (
    <div className="w-full bg-white py-20 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
           Stepping Up Agricultural  <br /> Intelligence in Sri Lanka
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Alongside farmers, government agencies and researchers, we are transforming how Sri Lanka monitors paddy fields—reducing crop losses, 
            strengthening food security, and supporting smarter decisions through satellite-powered insights.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">

          {/* Box 1 */}
          <div className="border-l-8 border-green-800 pl-0 md:pl-10 rounded-lg p-8 shadow-lg  bg-white " >
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-1">
              Who We Are <span className="text-green-700">&gt;</span>
            </h3>
            <p className="text-gray-700 mt-3">
                We’re a team building Sri Lanka’s first satellite-based rice monitoring and early-warning platform using Earth Observation, machine learning, and field data.            </p>
          </div>

          {/* Box 2 */}
          <div className="border-l-8 border-green-800 pl-0 md:pl-10 rounded-lg p-8 shadow-lg  bg-white ">
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-1">
              What We Do <span className="text-green-700">&gt;</span>
            </h3>
            <p className="text-gray-700 mt-3">
             We use Sentinel-1, Sentinel-2, and AI models to track paddy health, growth stages, water stress, and yield, giving near–real-time insights to reduce losses and support food-security planning.
            </p>
          </div>

          {/* Box 3 */}
          <div className="border-l-8 border-green-800 pl-0 md:pl-10 rounded-lg p-8 shadow-lg  bg-white ">
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-1">
              How To Help <span className="text-green-700">&gt;</span>
            </h3>
            <p className="text-gray-700 mt-3">
 Partner with us to advance digital agriculture. Share field data, join pilot tests, or integrate our platform to help farmers make faster decisions and reduce Sri Lanka’s reliance on rice imports.
            </p>
          </div>

          {/* Box 4 */}
          <div className="border-l-8 border-green-800 pl-0 md:pl-10 rounded-lg p-8 shadow-lg bg-white ">
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-1">
              Where We Work <span className="text-green-700">&gt;</span>
            </h3>
            <p className="text-gray-700 mt-3">
             Our system covers major paddy-growing districts across both Yala and Maha seasons, using cloud-penetrating radar for reliable, year-round monitoring—even during heavy monsoons.
            </p>
          </div>

        </div>
      </div>

      {/* Divider line */}
      <div className="border-b border-gray-300 mt-16"></div>
    </div>
  );
}

export default Overview;
