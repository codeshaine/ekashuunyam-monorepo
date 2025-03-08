"use client";

import React, { useRef, useState, useEffect } from "react";
import { ShipWheel } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import gsap from "gsap";
import Link from "next/link";

const menuItems = [
  { id: "events", label: "Events", color: "#412a1e", path: "events" },
  { id: "contact", label: "Contact", color: "#58acf4", path: "contact" },
  { id: "brochure", label: "Brochure", color: "#c8472c", path: "brochure" },
  { id: "home", label: "Home", color: "#c8472c", path: "" },
];

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const rotationRef = useRef<gsap.core.Tween | null>(null);
  const animationsRef = useRef<Map<string, gsap.core.Tween>>(new Map());

  useEffect(() => {
    gsap.defaults({
      force3D: true,
      ease: "power3.out",
    });

    // Initial setup for all menu items
    menuItems.forEach((item) => {
      const element = itemsRef.current.get(item.id);
      if (element) {
        gsap.set(element, {
          transformOrigin: "center center",
          translateZ: 0,
          scale: 1,
        });
      }
    });

    // Cleanup animations on unmount
    return () => {
      animationsRef.current.forEach((tween) => {
        tween.kill();
      });
    };
  }, []);

  const startRotation = () => {
    if (!wheelRef.current) return;
    rotationRef.current?.kill();
    rotationRef.current = gsap.to(wheelRef.current, {
      rotation: "+=360",
      duration: 2,
      ease: "linear",
      repeat: -1,
    });
  };

  const stopRotation = () => {
    if (!wheelRef.current || !rotationRef.current) return;
    const currentRotation = gsap.getProperty(
      wheelRef.current,
      "rotation",
    ) as number;
    rotationRef.current.kill();
    rotationRef.current = gsap.to(wheelRef.current, {
      rotation: currentRotation + 100,
      duration: 3,
      ease: "power2.out",
    });
  };

  const handleMenuItemHover = (id: string) => {
    setActiveItem(id);

    menuItems.forEach((item) => {
      const element = itemsRef.current.get(item.id);
      if (!element) return;

      // Kill any existing animation for this item
      animationsRef.current.get(item.id)?.kill();

      if (item.id === id) {
        // Active item animation
        const tween = gsap.to(element, {
          opacity: 1,
          scale: 1.1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)", // Adjusted for smoother elastic effect
          transformOrigin: "center center",
          force3D: true,
        });
        animationsRef.current.set(item.id, tween);
      } else {
        // Inactive items animation
        const tween = gsap.to(element, {
          opacity: 0.3,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "center center",
          force3D: true,
        });
        animationsRef.current.set(item.id, tween);
      }
    });
  };

  const handleMenuItemLeave = () => {
    setActiveItem(null);

    menuItems.forEach((item) => {
      const element = itemsRef.current.get(item.id);
      if (!element) return;

      // Kill any existing animation for this item
      animationsRef.current.get(item.id)?.kill();

      // Create new reset animation
      const tween = gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 1.5, // Increased duration for smoother return
        ease: "elastic.out(0.5, 0.3)", // Smoother elastic return
        transformOrigin: "center center",
        force3D: true,
      });
      animationsRef.current.set(item.id, tween);
    });
  };

  useEffect(() => {
    if (activeItem) {
      console.log(`Active item is ${activeItem}`);
    }
  }, [activeItem]);

  // Rest of your return statement remains the same
  return (
    <nav
      className={`${isOpen ? "bg-black/90 animate-in fade-in-0" : "bg-transparent animate-out fade-out-0"} fixed top-0 z-10 flex h-[4rem] w-full items-center justify-end border-none px-10 pt-3`}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="">
          <div className="flex w-full items-center justify-end">
            <ShipWheel
              ref={wheelRef}
              onMouseEnter={startRotation}
              onMouseLeave={stopRotation}
              className="h-10 w-10 cursor-pointer text-[#DAA520] drop-shadow-xl"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="h-screen w-screen border-none bg-black/90 p-0 shadow-2xl">
          <div className="relative h-full w-full">
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-transparent">
              {/* <Compass className="h-full w-full text-white" /> */}
              <div>
                <img src="/images/compass.png" alt="Decorative SVG" />
              </div>
            </div>

            {menuItems.map((item, index) => {
              const angle = index * 90 - 45;
              const radius = 130;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={item.id}
                  // @ts-expect-error - Ref is not a valid prop
                  ref={(el) => el && itemsRef.current.set(item.id, el)}
                  className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 bg-cover"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    willChange: "transform, opacity",
                    borderRadius: "2rem",
                  }}
                  onMouseEnter={() => handleMenuItemHover(item.id)}
                  onMouseLeave={handleMenuItemLeave}
                >
                  <Link
                    href={`/${item.path}`}
                    className="ext-xl flex h-full w-full items-center justify-center font-mono font-bold text-white"
                    style={{
                      // backgroundColor: item.color,
                      backfaceVisibility: "hidden",
                      borderRadius: "2rem",
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
