"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

export const SixthSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      tl.to(".svg-path", {
        attr: {
          d: "M0,250 Q250,50 500,250 T950,250 T1000,200", // Moving the path down
        },
        ease: "none",
        strokeWidth: "23",
        strokeDasharray: "30 30",
      })
        .to(
          "#rect",
          {
            motionPath: "M0,250 Q250,50 500,250 T950,250 T1000,200",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
            start: 0.4,
            end: 0.9,
          },
          0,
        )
        .to(
          ".cnt",
          {
            rotate: -15,
            scale: 1.5,
            ease: "sine.out",
          },
          0,
        );
    }
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-screen bg-stone-950">
      <div className="cnt flex-center relative h-full w-full">
        <div className="flex-center z-10 p-8">
          <p className="txt font-heart text-5xl text-white md:text-8xl">
            “ONE PIECE… ”
          </p>
        </div>
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="25 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="svg-path"
            stroke="#BE9724"
            strokeWidth="13"
            strokeDasharray="10 10"
            fill="none"
            d="M0,0 Q250,50 500,250 T950,250 T1000,200"
          />
          <g id="rect">
            <rect width={105} height={27} fill="#DADADA" />
            <text x="10" y="19" fontSize="14">
              DOES EXIST!!!
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
