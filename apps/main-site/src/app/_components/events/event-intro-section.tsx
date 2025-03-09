"use client";

import { MoveRight } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export const EventIntroCard = memo(() => {
  // const { scrollToSection } = useScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section, {
      willChange: "transform, scale",
      force3D: true,
      translateZ: 0,
      backfaceVisibility: "hidden",
    });

    const animation = gsap.fromTo(
      section,
      {
        scale: 0.6,
        // rotate: -15,
        borderRadius: "10%",
      },
      {
        scale: 1,
        rotate: 0,
        borderRadius: "0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 0.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      },
    );

    return () => {
      animation.kill();
      // Clear any lingering props
      gsap.set(section, { clearProps: "all" });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex-center sticky top-0 flex h-screen flex-col items-center justify-center gap-3 bg-stone-900"
    >
      <p className="text-center font-sayyeda text-5xl font-bold tracking-widest text-stone-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Be ready for the{" "}
        <span className="font-sayyeda text-white/70">Exiting Events</span>
      </p>
      <div
        // onClick={() => scrollToSection("rules")}
        className="flex cursor-pointer items-center justify-center rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        Skip
        <MoveRight
          // onClick={() => scrollToSection("rules")}
          className="ml-2 inline-block"
          size={20}
        />
      </div>
    </div>
  );
});

EventIntroCard.displayName = "EventIntroCard";
