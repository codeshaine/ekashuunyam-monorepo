"use client"

import { useScroll } from "@/lib/scroll-context";
import { MoveRight } from "lucide-react";
import { memo } from "react";

export const EventIntroCard = memo(() => {
    const { scrollToSection } = useScroll();
    return (
      <div className="flex-center sticky top-0 flex h-screen flex-col items-center justify-center gap-3 bg-stone-900">
        <p className="text-center font-sayyeda text-5xl font-bold tracking-widest text-stone-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Be ready for the <span className="text-white/70">exiting events</span>
        </p>
        <div
          onClick={() => scrollToSection("rules")}
          className="flex cursor-pointer items-center justify-center rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        >
          Skip
          <MoveRight
            onClick={() => scrollToSection("rules")}
            className="ml-2 inline-block"
            size={20}
          />
        </div>
      </div>
    );
  });