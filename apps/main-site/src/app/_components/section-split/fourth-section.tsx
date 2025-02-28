"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FourthSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".box", 
      {
        width: "20vw",
        height: "20vh",
      },
      {

        width: "100vw",
        height: "100vh",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,    
        },
          ease:"power2.inOut" 
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] bg-[#C72626] text-[3.5vw] text-white"
    >
      <div className="sticky top-0 h-screen bg-stone-800">
        <div className="h-full w-full flex-center">
          <div className="box bg-blue-950 flex-center text-sm">
            <p>Demo Section</p>
          </div>
        </div>
      </div>
    </div>
  );
};
