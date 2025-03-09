"use client";

import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { gsap } from "gsap";
import Loading from "@/app/loading";

const animationUtils = {
  createInitialAnimation: (
    letterRefs: React.MutableRefObject<HTMLSpanElement[]>,
    letters: string[],
  ) => {
    const tl = gsap.timeline();
    const ltr = letterRefs.current;

    gsap.set(ltr, {
      opacity: 1,
      y: 40,
    });

    // Animate each letter with proper timing
    ltr.forEach((letter, index) => {
      const delay = index * 0.05;
      const char = letters[index];

      if (char === "O") {
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
      } else if (char === ".") {
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
      } else if (char === "2") {
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
      } else if (char === " ") {
        tl.to(letter, { opacity: 1, duration: 0.3 }, delay);
      } else if ("aeiou".includes(char?.toLowerCase() ?? "")) {
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

    return tl;
  },

  setupPersistentAnimations: (
    letterRefs: React.MutableRefObject<HTMLSpanElement[]>,
    letters: string[],
  ) => {
    const ltr = letterRefs.current;
    const oIndex = letters.length - 1;
    const targetElement = ltr[oIndex];

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
  },
};

interface TitleDivElement extends HTMLDivElement {
  cleanupInteractions?: () => void;
}

const TitleAnimation = memo(({ titleText }: { titleText: string }) => {
  const titleRef = useRef<TitleDivElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const letters = titleText.split("");
  const context = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const ltr = letterRefs.current;
    context.current = gsap.context(() => {
      gsap.set(ltr, {
        opacity: 1,
        y: 40,
      });
    });

    return () => context.current?.revert();
  }, []);

  // Handle animations with useEffect (runs after browser paints)
  useEffect(() => {
    if (!titleRef.current) return;
    const ltr = letterRefs.current;

    const setupInteractions = () => {
      const handleMouseEnter = () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

        rafIdRef.current = requestAnimationFrame(() => {
          ltr.forEach((letter) => {
            if (!letter) return;
            gsap.to(letter, {
              y: "random(-10, 10)",
              rotation: "random(-15, 15)",
              duration: 0.3,
              ease: "power1.inOut",
              cursor: "n-resize",
              overwrite: true,
            });
          });
          rafIdRef.current = null;
        });
      };

      const handleMouseLeave = () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

        ltr.forEach((letter) => {
          if (!letter) return;
          gsap.to(letter, {
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            overwrite: true,
          });
        });
      };

      if (titleRef.current) {
        titleRef.current.addEventListener("mouseenter", handleMouseEnter);
        titleRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (titleRef.current) {
          titleRef.current.removeEventListener("mouseenter", handleMouseEnter);
          titleRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    };

    // Update the GSAP context with animations
    context.current = gsap.context(() => {
      const tl = animationUtils.createInitialAnimation(letterRefs, letters);
      tl.call(() => {
        animationUtils.setupPersistentAnimations(letterRefs, letters);
        const cleanupInteractions = setupInteractions();

        if (titleRef.current) {
          titleRef.current.cleanupInteractions = () =>
            cleanupInteractions && cleanupInteractions();
        }
      });
    }, titleRef);

    // Clean up all animations and event listeners
    return () => {
      gsap.killTweensOf(ltr);
      gsap.getById("persistentO")?.kill();
      context.current?.revert();
    };
  }, [letters]);

  return (
    <div
      ref={titleRef}
      className="m-0 flex p-0 font-sayyeda text-[3.9rem] uppercase leading-[5rem] sm:text-[4.7rem] md:text-[7rem]"
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) letterRefs.current[index] = el;
          }}
          className="inline-block"
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform", // Hint to browser about future transforms
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
});

TitleAnimation.displayName = "TitleAnimation";

export const LandingVideo = () => {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleText = "Ekashunyam 2.O";

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          videoRef.current?.play().catch((error) => {
            console.error("Video play failed:", error);
          });
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );
  
    observer.observe(containerRef.current);
  
    return () => {
      observer.disconnect();
    };
  }, [videoLoaded]);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 50);

    // Preload the video
    const videoElement = new Image();
    videoElement.src =
      "https://res.cloudinary.com/dvpaztqr9/video/upload/f_auto:video,q_auto/v1/Ekashunyam2.0/nwozqolb289jvnlwtvps";

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div ref={containerRef} className="relative h-screen w-screen">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        // style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source
          src="https://res.cloudinary.com/dvpaztqr9/video/upload/f_auto:video,q_auto/v1/Ekashunyam2.0/nwozqolb289jvnlwtvps"
          type="video/mp4"
        />
      </video>
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-0 md:gap-3">
          <TitleAnimation titleText={titleText} />
          <p
            className="txt font-sans text-sm font-light opacity-0"
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  opacity: 1,
                  duration: 0.8,

                  delay: 1.2,
                  ease: "power2.out",
                });
              }
            }}
          >
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
