"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const RulesSection = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current) {
      // Create a GSAP timeline for the path animation
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      // Animate the path's d attribute to create a wave effect
      tl.to(pathRef.current, {
        duration: 4,
        attr: {
          d: "M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,106.7C672,85,768,75,864,90.7C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        },
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div id="rules" className="bg-transparent">
      {/* Oceanic Wave Animations */}
      <div className="flex-center sticky top-0 h-screen w-full">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-wave-1 animate-wave-1 absolute -bottom-10 left-0 right-0 h-96 opacity-30"></div>
          <div className="bg-wave-2 animate-wave-2 absolute -bottom-10 left-0 right-0 h-96 opacity-50"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-full max-w-4xl rounded-3xl border-4 border-blue-700/20 bg-white/70 p-12 shadow-2xl backdrop-blur-sm">
            <div className="mb-10 text-center">
              <h1 className="font-sayyeda text-4xl font-bold tracking-widest text-blue-900 drop-shadow-lg xl:text-6xl">
                PIRATE CoDE
              </h1>
              <h2 className="font-sans text-xl font-semibold text-blue-700">
                General Rules
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-blue-300 bg-blue-100/50 p-6">
                <ul className="space-y-4 font-heart text-blue-900">
                  {[
                    "Open to BCA, BSC [Computer Science] and BVOC [Software] students",
                    "Maximum of 16 students per team",
                    "Two teams allowed per college",
                    "Registration fees: 500 per team",
                    "Confirm participation through website",
                    "All participants must arrive by 9:00 am",
                  ].map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-2xl text-blue-600">⚓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border-2 border-blue-300 bg-blue-100/50 p-6">
                <ul className="space-y-4 font-heart text-blue-900">
                  {[
                    "Carry college ID card and permission letter",
                    "Participate in all events for overall championship",
                    "Breakfast and lunch provided",
                    "Embrace the spirit of adventure!",
                  ].map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-2xl text-blue-600">🏴‍☠️</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-[100vh] flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="z-10"
        >
          <path
            ref={pathRef}
            fill="#0099ff"
            fillOpacity="1"
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,58.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="-mt-2 flex-grow bg-[#0099FF]"></div>
      </div>

      {/* Straw Hat Pirates Inspired Container */}
    </div>
  );
};
