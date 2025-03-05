"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    name: "luffy",
    image: "/pfp/luffy.jpeg",
  },
  {
    name: "sanji",
    image: "/pfp/sanji.jpeg",
  },
  {
    name: "zoro",
    image: "/pfp/zoro.jpeg",
  },
];

export const EightSection = () => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRefs.current[0] || !imageRefs.current[1] || !imageRefs.current[2])
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(
      imageRefs.current[0],
      {
        y: -100,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      imageRefs.current[2],
      {
        y: -200,
        ease: "power2.inOut",
      },
      0,
    );
  }, []);

  //   const cursorRef = useRef<HTMLDivElement>(null);

  //   const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  //     console.log(e.clientX, e.clientY);
  //     gsap.to(cursorRef.current, {
  //       x: `${e.clientX}px`,
  //       y: `${e.clientY}px`,
  //       ease: "power2.inOut",
  //     });
  //   };

  return (
    <div ref={sectionRef} className="flex-center h-screen gap-16 bg-black px-36">
      {content.map((cn, index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null): void => {
            imageRefs.current[index] = el;
          }}
          className="rounded-lg p-4 shadow-md"
          style={{
            transform: `${index === 0 ? "translateY(20%)" : index === 1 ? "translateY(0%)" : "translateY(10%)"}`,
          }}
        >
          <img
            // onMouseEnter={handleMouseEnter}
            // onMouseMove={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            src={cn.image}
            alt={`Description ${index + 1}`}
            className="rounded object-cover"
          />
          <p className="text-sm text-white">Image - {cn.name}</p>
        </div>
      ))}
      {/* <div
        ref={cursorRef}
        className="absolute h-16 w-16 rounded-full bg-black/80 backdrop-blur-sm"
      /> */}
    </div>
  );
};
