"use client";

import { useScroll } from "@/lib/scroll-context";
import { MoveRight } from "lucide-react";
import { memo } from "react";

export const EventIntroCard = memo(() => {
  //eslint-disable-next-line
  const { scrollToSection } = useScroll();
  return (
    <div className="flex-center sticky top-0 flex h-screen flex-col items-center justify-center gap-3 bg-stone-900">
      <p className="text-center font-sayyeda text-4xl font-bold tracking-widest text-stone-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Be ready for the{" "}
        <span className="font-sayyeda text-white/70">Exiting Events</span>
      </p>
      <div
        //eslint-disable-next-line
        onClick={() => scrollToSection("rules")}
        className="flex cursor-pointer items-center justify-center rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        Skip
        <MoveRight
          //eslint-disable-next-line
          onClick={() => scrollToSection("rules")}
          className="ml-2 inline-block"
          size={20}
        />
      </div>
    </div>
  );
});
//eslint-enable
EventIntroCard.displayName = "EventIntroCard"; // Needed
