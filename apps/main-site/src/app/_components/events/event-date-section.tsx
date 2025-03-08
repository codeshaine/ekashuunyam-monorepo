"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const EventDate = () => {
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
            motionPath: {
              path: "M0,250 Q250,50 500,250 T950,250 T1000,200",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 0.9,
            },
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "50% 50%",
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

      return () => {
        tl.kill();

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        gsap.set(".svg-path", { clearProps: "all" });
        gsap.set("#rect", { clearProps: "all" });
        gsap.set(".cnt", { clearProps: "all" });
      };
    }
  }, [containerRef]);
  return (
    <div
      ref={containerRef}
      className="b-[#A3DBFF] sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="cnt flex-center relative h-full w-full">
        <div className="flex-center z-10 p-8">
          <p className="txt font-sayyeda text-6xl text-black/70 text-white md:text-9xl">
            MAR 26
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
          <g
            id="rect"
            className="absolute border border-black"
            transform="translate(0, 250)"
          >
            <rect fill="none" className="h-44 w-96" />
            <text
              x="150"
              y="100"
              fill="#BE9724"
              className="font-sayyeda text-9xl font-light md:text-4xl"
            >
              SET SAIL ON
            </text>
          </g>
        </svg>
      </div>
      {/* <div className="flex-center h-full w-full flex-col">
        <div className="flex-center flex-col gap-5 py-10">
          <p className="text-center font-sans text-2xl font-bold">
            The Log Pose is Set !
          </p>
          <p>Mark your calendars, mates!</p>
        </div>
        <div className="w-full">
          <img
            src="/images/g4.png"
            alt="g4"
            className="w-full -rotate-3 object-cover"
          />
        </div>
      </div> */}
    </div>
  );
};
