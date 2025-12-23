import React from "react"
import Reveal from "./Reveal"

function Info() {
  return (
    <section id="info" className="w-full">
      <div className="bg-white dark:bg-slate-900 py-6 md:py-20">

        <div className="mx-auto max-w-[320px] md:max-w-7xl px-3 grid md:grid-cols-2 gap-6 md:gap-16">

          {/* LEFT */}
          <Reveal>
            <div>
              <h2 className="text-base md:text-5xl font-semibold leading-tight dark:text-white">
                Agricultural Intelligence for Sri Lanka
              </h2>

              <p className="mt-2 text-[11px] md:text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                We work with farmers and institutions to reduce crop losses
                and support smarter agricultural decisions using satellite data.
              </p>
            </div>
          </Reveal>

          {/* RIGHT */}
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {[
              ["Who We Are", "Sri Lanka’s first satellite-based rice monitoring platform."],
              ["What We Do", "Monitor crop health using Sentinel satellites and AI."],
              ["How To Help", "Collaborate with us to scale digital agriculture."],
              ["Where We Work", "Across major paddy-growing regions nationwide."]
            ].map(([title, text], i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="border-l-3 border-green-800 pl-3">
                  <h3 className="text-[11px] md:text-base font-semibold text-green-800 dark:text-green-400">
                    {title}
                  </h3>
                  <p className="mt-1 text-[10px] md:text-sm text-gray-700 dark:text-slate-300">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Info