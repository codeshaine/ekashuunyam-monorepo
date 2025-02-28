"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const SecondSection = () => {
  return (
    <main className="h-[200vh] bg-gray-950">
      <Section1 />
      <Section2 />
    </main>
  );
};

const Section1 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      {
        scale: 1,
        rotate: 0,
      },
      {
        scale: 0.8,
        rotate: -5,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 bg-[#C72626] p-36 text-sm text-white"
    >
      <p className="w-[50vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, amet? Amet
        ex fuga veritatis totam architecto? Minima repellat alias cumque nemo
        earum quae blanditiis commodi, fugit laudantium non itaque voluptates.
      </p>
      <div className="flex gap-4">
        <div className="relative aspect-square w-44">
          <Image src={"/pfp/brook.jpeg"} alt="img" fill />
        </div>
      </div>
    </div>
  );
};

const Section2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      {
        scale: 0.6,
        rotate: -15,
      },
      {
        scale: 1,
        rotate: 0,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center bg-red-500"
    >
      <p className="w-[50vw] text-center text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, amet? Amet
        ex fuga veritatis totam architecto? Minima repellat alias cumque nemo
        earum quae blanditiis commodi, fugit laudantium non itaque voluptates.
      </p>
    </div>
  );
};
