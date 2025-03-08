"use client";

import { useEffect, useRef } from "react";
import { TitleSection } from "./title";
import { SponsersMarquee } from "./marquee";
import { sponsersData, SponsersPriority } from "@/lib/data/sponsers";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const highPriorityData = sponsersData.filter(
  (s) => s.priority === SponsersPriority.High,
);

const lowPrioritySponsers = sponsersData.filter(
  (s) => s.priority == SponsersPriority.Low,
);

gsap.registerPlugin(ScrollTrigger);

export const SponsorsViewSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.fromTo(
      ".box",
      {
        width: "20vw",
        height: "20vh",
      },
      {
        width: "100vw",
        height: "100vh",
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      ".marquee-container",
      {
        opacity: 1,
      },
      0,
    );

    tl.to(
      ".title-container",
      {
        opacity: 1,
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] text-[3.5vw] text-white"
    >
      <div className="sticky top-0 h-screen bg-[#0099FF]">
        <div className="flex-center h-full w-full">
          <div
            className="box overflow-hidden bg-blue-950 text-sm"
            style={{
              backgroundImage: `url('/images/101.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <TitleSection
              title="THE gRAND FLEET"
              description="These mighty allies are fueling our journey to greatness!"
              className="title-container opacity-0"
            />
            <div className="marquee-container flex flex-col gap-10 opacity-0">
              <SponsersMarquee
                priority={SponsersPriority.High}
                data={highPriorityData}
              />
              <SponsersMarquee
                priority={SponsersPriority.Low}
                data={lowPrioritySponsers}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
