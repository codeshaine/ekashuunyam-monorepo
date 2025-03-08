"use client";

import { EventsData } from "@/lib/data/events";
import { memo, useEffect, useRef, useState } from "react";
import { EventDetailsModal } from "./event-card-modal";
import gsap from "gsap";
import Image from "next/image";

export const Eventcards = memo(
  ({
    index,
    title,
    description,
    image,
    participants,
    color,
    themeTitle,
    rules,
    heads,
  }: EventsData) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const section = sectionRef.current;
      if (!section) return;
    
      // Hardware acceleration for elements with background images
      gsap.set(section, {
        willChange: 'transform, scale',
        force3D: true,
        translateZ: 0, // Additional GPU acceleration
        backfaceVisibility: 'hidden'
      });
    
      const animation = gsap.fromTo(
        section,
        {
          scale: 0.6,
          rotate: index ? (index % 2 === 0 ? -15 : 15) : -15,
        },
        {
          scale: 0.87,
          rotate: index ? index * 0.2 : 0,
          ease: "power1.inOut", // Smoother easing than 'none'
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.5, // Slightly softer scrubbing
            invalidateOnRefresh: true, // Helps with responsive designs
            // Optional performance optimizations
            fastScrollEnd: true,
            preventOverlaps: true
          }
        }
      );
    
      return () => {
        animation.kill();
        // Clear any lingering props
        gsap.set(section, { clearProps: 'all' });
      };
    }, [index]);

    const teamText =
      participants === 1 ? "Individual Event" : `${participants} make a team`;

    const cardStyle = {
      backgroundImage: `url('/images/zoom.jpg')`,
      backgroundColor: `#${color}`,
      backgroundBlendMode: "multiply" as const,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <>
        <div
          ref={sectionRef}
          className="sticky top-0 flex h-screen items-center justify-center bg-stone-900 will-change-transform"
          style={{
            transform: "translateZ(0)",
            // ...cardStyle,
          }}
        >
          <p className="absolute left-0 top-0 p-8 text-5xl font-bold text-white ">
            {index ? index + 1 : "1"}/8
          </p>
          <div
            className="flex w-[20rem] flex-col gap-4 rounded-xl border-[#DE9E50] p-10 sm:w-[25rem] sm:border-8 md:w-[30rem] lg:w-[35rem]"
            style={{
              backgroundColor: `#${color}`,
            }}
          >
            <div className="relative h-44 w-full bg-red-600">
              <Image fill src={image} alt="" className="object-cover" />
            </div>
            <div className="relative flex flex-col gap-2 text-white">
              <p className="text-3xl font-bold ">{themeTitle}</p>
              <p className="text-sm">{description}</p>
              <div className="w-fit bg-white px-3 py-1 text-black">
                <p>{teamText}</p>
              </div>
              <div className="absolute -top-8 right-0 -rotate-6 bg-white px-2 py-1 text-sm font-semibold text-black">
                {title}
              </div>
            </div>
            <div className="flex-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-800 px-4 py-2 text-white"
              >
                View more
              </button>
            </div>
          </div>
          <EventDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={title}
            themeTitle={themeTitle}
            color={color}
            rules={rules}
            heads={heads}
            description={description}
          />
        </div>
      </>
    );
  },
);
