import React from "react"
import bgVideo from "../assets/bgVideo.webm"

const Hero = () => {
  return (
    <section className="w-full">
      <div className="relative min-h-[45vh] md:min-h-screen overflow-hidden">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={bgVideo} type="video/webm" />
        </video>

        {/* Content */}
        <div className="relative flex justify-center px-3 pt-16 md:absolute md:inset-0 md:items-center md:pt-0">
          <div className="w-full max-w-[320px] md:max-w-lg md:mr-12">

            <div className="bg-white/95 dark:bg-slate-800 rounded shadow p-4 md:p-10">
              <h1 className="text-base md:text-4xl font-semibold leading-tight text-center dark:text-white">
                Protect Sri Lanka’s Paddy Fields
              </h1>

              <p className="mt-2 text-[11px] md:text-base text-center text-slate-600 dark:text-slate-300">
                Satellite insights for sustainable farming.
              </p>

              <div className="mt-3 flex justify-center">
                <a
                  href="#info"
                  className="px-3 py-1.5 text-[11px] md:text-sm bg-green-700 text-white rounded font-medium"
                >
                  Learn more
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero