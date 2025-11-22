import React from "react";
import rice from "../assets/rice.jpg";
import Reveal from "./Reveal";

function Mission() {
  return (
    <Reveal>
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Wrap everything in relative so card can overlap */}
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center pb-32">

          {/* Left Image */}
          <div className="relative w-full lg:col-span-6">
            <img
              src={rice}
              alt="Forest path"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="mt-10 lg:mt-0 lg:col-span-6">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-green-800 uppercase">
                Our Mission
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                Conserving the lands and waters on which all life depends
              </h2>
              <p className="mt-4 text-gray-700">
                Every acre we protect and every river mile we restore begins with you.
                Your support helps us take on the dual threats of climate change and
                biodiversity loss across 80+ countries and territories.
              </p>
              <button className="mt-6 bg-green-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-900 transition">
                Donate Now
              </button>
            </div>
          </div>

          {/* Overlapping Newsletter Card */}
          <div
            className="
              bg-white border-t-4 border-green-800 shadow-xl rounded-lg
              w-11/12 md:w-3/4 lg:w-2/3 px-6 py-8 lg:px-10 lg:py-12
              mx-auto mt-8 lg:mt-0
              lg:absolute lg:left-5/8 lg:-translate-x-1/2 lg:-bottom-1 lg:transform
            "
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Get our latest conservation news and see how we’re protecting our natural world.
            </h3>

            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Email address:
                </label>
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-800"
                />
              </div>

              <button
                type="submit"
                className="bg-green-800 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-900 transition self-end"
              >
                SIGNUP
              </button>
            </form>
          </div>


        </div>
      </div>
    </section>
    </Reveal>
  );
}

export default Mission;
