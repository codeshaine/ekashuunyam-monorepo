"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, memo } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const PATHS = {
  finalPath: "M0,220 Q250,50 500,250 T950,250 T1000,200",
  motionPath: "M0,-90 Q250,50 500,250 T950,250 T1000,200",
  initialPath: "M0,-90 Q250,50 500,250 T950,250 T1000,200",
};

interface AnimatedSVGProps {
  pathRef: RefObject<SVGPathElement>;
  rectRef: RefObject<SVGGElement>;
}

const AnimatedSVG = memo(({ pathRef, rectRef }: AnimatedSVGProps) => (
  <svg
    className="absolute left-0 top-0 h-full w-full"
    viewBox="25 0 1000 500"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      ref={pathRef}
      className="svg-path"
      stroke="#BE9724"
      strokeWidth="13"
      strokeDasharray="10 10"
      fill="none"
      d={PATHS.initialPath}
    />
    <g
      ref={rectRef}
      id="rect"
      path={PATHS.motionPath}
      transform="translate(-150,0)"
    >
      <rect fill="none" className="h-44 w-96" />
      <text
        fill="#DADADA"
        className="font-sayyeda text-3xl font-light md:text-4xl"
      >
        SET SAIL ON
      </text>
    </g>
  </svg>
));

AnimatedSVG.displayName = "AnimatedSVG";

export const EventDate = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rectRef = useRef<SVGGElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isSetupComplete = useRef(false);
  useLayoutEffect(() => {
    if (!containerRef.current || isSetupComplete.current) return;
    
    // Store ref values to avoid stale references in cleanup
    const container = containerRef.current;
    const bg = bgRef.current;
    
    const ctx = gsap.context(() => {
      gsap.set([".svg-path", "#rect", ".cnt"], {
        willChange: "transform",
      });

      gsap.set(bg, {
        willChange: "filter",
      });

      // Create the timeline with performance optimizations
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: false,
          fastScrollEnd: true, // Better performance for fast scrolling
          onEnter: () => {
            // Mark visible in browser profiling tools
            containerRef.current?.setAttribute("data-visible", "true");
          },
          onLeave: () => {
            containerRef.current?.setAttribute("data-visible", "false");
          },
        },
        onComplete: () => {
          // Release transform hints when animation completes
          gsap.set([".svg-path", "#rect", ".cnt", bg], {
            willChange: "auto",
          });
        },
      });

      // Apply optimized animations with better batching
      timelineRef.current
        .to(
          ".svg-path",
          {
            attr: { d: PATHS.finalPath },
            ease: "none",
            strokeWidth: "23",
            strokeDasharray: "30 30",
            force3D: true,
          },
          0,
        )
        .to(
          "#rect",
          {
            motionPath: {
              path: PATHS.motionPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 0.9,
            },
            force3D: true,
          },
          0,
        )
        .to(
          ".cnt",
          {
            rotate: -15,
            scale: 1.5,
            ease: "sine.out",
            force3D: true,
          },
          0,
        )
        .to(
          bg,
          {
            borderRadius: "10%",
            scale:.8,
            filter: "brightness(.7) saturate(1.2)",
          },
          0,
        );

      isSetupComplete.current = true;
    }, containerRef);

    // More explicit cleanup function
    return () => {
      // Kill timeline first
      // Kill all scroll triggers associated with this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });

      // Reset will-change
      gsap.set([".svg-path", "#rect", ".cnt", bg], {
        clearProps: "all",
        willChange: "auto",
      });

      // Revert context at the end
      ctx.revert();

      // Reset setup flag
      isSetupComplete.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ contain: "strict" }} // Add CSS containment for better performance
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          filter: "brightness(.3) saturate(.8)",
          transform: "translateZ(0)", // Force GPU acceleration
        }}
      >
        <Image
          src="https://res.cloudinary.com/dvpaztqr9/image/upload/f_auto,q_auto/v1/Ekashunyam2.0/jctpqjasberfozhlqzpa"
          alt="Event background"
          fill
          priority
          sizes="100vw"
          quality={85}
          loading="eager"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transform: "translateZ(0)", // Force GPU acceleration
          }}
          onLoad={(event) => {
            // Add a loaded class to help with animations
            event.currentTarget.classList.add("image-loaded");
          }}
        />
      </div>

      <div
        className="cnt flex-center relative h-full w-full"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="flex-center relative z-10 p-8">
          <p className="txt font-sayyeda text-6xl text-white md:text-9xl">
            MAR 26
          </p>
        </div>
        <AnimatedSVG pathRef={pathRef} rectRef={rectRef} />
      </div>
    </div>
  );
};
