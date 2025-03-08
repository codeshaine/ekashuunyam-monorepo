"use client";

import React, { use, useEffect, useRef } from "react";
import { gsap } from "gsap";

export const LandingVideo = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const titleText = "Ekashunyam 2.O";
  const letters = titleText.split("");

  useEffect(() => {

    const initialAnimation = () => {
      const tl = gsap.timeline();

      // Set initial state for all letters
      gsap.set(letterRefs.current, {
        opacity: 1,
        y: 40,
      });

      // Animate each letter with proper timing
      letterRefs.current.forEach((letter, index) => {
        const delay = index * 0.1;

        // Different animations based on character type
        if (letters[index] === "O") {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              rotationY: 360,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            delay,
          );
        } else if (letters[index] === ".") {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "bounce.out",
            },
            delay,
          );
        } else if (letters[index] === "2") {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "elastic.out(1, .3)",
              yoyo: true,
            },
            delay,
          );
        } else if (letters[index] === " ") {
          tl.to(
            letter,
            {
              opacity: 1,
              duration: 0.3,
            },
            delay,
          );
        } else if (
          letters[index] &&
          "aeiou".includes(letters[index].toLowerCase())
        ) {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.5,
              onComplete: () => {
                gsap.to(letter, {
                  x: "random(-5, 5)",
                  y: "random(-5, 5)",
                  duration: 0.1,
                  ease: "none",
                  repeat: 4,
                  yoyo: true,
                  onComplete: () => {
                    gsap.to(letter, { x: 0, y: 0, duration: 0.2 });
                  },
                });
              },
            },
            delay,
          );
        } else {
          tl.to(
            letter,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            delay,
          );
        }
      });

      // Return the timeline so we can chain or coordinate with other animations
      return tl;
    };

    const setupPersistentAnimations = () => {
      const oIndex = letters.length - 1;
      const targetElement = letterRefs.current[oIndex];

      if (targetElement) {
        gsap.to(targetElement, {
          rotationX: 360,
          duration: 5,
          ease: "elastic.out",
          repeat: -1,
          delay: 2,
          id: "persistentO",
        });
      }
      //animation for other letters execpt 'O'
      // letterRefs.current.forEach((letter, index) => {
      //   if (index === oIndex) return;

      //   if (index % 3 === 0) {
      //     gsap.to(letter, {

      //       duration: 1.5 + Math.random() * 0.5,
      //       repeat: -1,
      //       yoyo: true,
      //       ease: "sine.inOut",
      //       id: "persistentIdle"
      //     });
      //   } else if (index % 3 === 1) {
      //     gsap.to(letter, {
      //       rotation: 3,
      //       duration: 2 + Math.random() * 0.5,
      //       repeat: -1,
      //       yoyo: true,
      //       ease: "sine.inOut",
      //       id: "persistentIdle"
      //     });
      //   } else {
      //     gsap.to(letter, {
      //       scale: 1.05,
      //       duration: 1.8 + Math.random() * 0.5,
      //       repeat: -1,
      //       yoyo: true,
      //       ease: "sine.inOut",
      //       id: "persistentIdle"
      //     });
      //   }
      // });
    };

    const setupInteractions = () => {
      const handleMouseEnter = () => {
        gsap.getById("persistentIdle")?.pause();

        letterRefs.current.forEach((letter) => {
          gsap.to(letter, {
            y: "random(-10, 10)",
            rotation: "random(-15, 15)",
            duration: 0.3,
            ease: "power1.inOut",
            cursor: "n-resize",
          });
        });
      };

      const handleMouseLeave = () => {
        letterRefs.current.forEach((letter) => {
          gsap.to(letter, {
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
              gsap.getById("persistentIdle")?.play();
            },
          });
        });
      };

      if (!titleRef.current) return;
      titleRef.current.addEventListener("mouseenter", handleMouseEnter);
      titleRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (!titleRef.current) return;
        titleRef.current.removeEventListener("mouseenter", handleMouseEnter);
        titleRef.current.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    gsap.context(() => {
      const tl = initialAnimation();
      tl.call(() => {
        setupPersistentAnimations();
        setupInteractions();
      });
    });

    return () => {
      gsap.killTweensOf(letterRefs.current);
      gsap.getById("persistentO")?.kill();
      gsap.getById("persistentIdle")?.kill();
    };
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      >
        <source src="/video/landing.mp4" type="video/mp4" />
      </video>
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-0 md:gap-3">
          <div
            ref={titleRef}
            className="m-0 flex p-0 font-sayyeda text-[3.8rem] uppercase leading-[5rem] sm:text-[4.7rem] md:text-[7rem]"
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                className="inline-block"
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
          <p className="font-sans text-sm font-light">
            An intercollegiate fest
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center py-1 text-center">
        <p className="font-sans text-[0.7rem] font-light capitalize text-white">
          organised by IT Club department of computer science <br /> SDM college
          ujire
        </p>
      </div>
    </div>
  );
};
