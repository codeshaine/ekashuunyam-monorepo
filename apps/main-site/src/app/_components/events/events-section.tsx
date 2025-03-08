"use client";

import { memo, useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RulesSection } from "../rules/rules-section";
import { MoveRight, X } from "lucide-react";
import { useScroll } from "@/lib/scroll-context";
import { EventDate } from "./event-date-section";
import { EventIntroCard } from "./event-intro-section";
import { eventsData, EventsData } from "@/lib/data/events";
import { Eventcards } from "./event-card-section";

gsap.registerPlugin(ScrollTrigger);

export const EventsSection = memo(() => {
  const renderEventCards = useCallback(
    (event: EventsData, index: number) => (
      <Eventcards key={event.id} {...event} index={index} />
    ),
    [],
  );

  return (
    <main className="relative bg-gray-950 will-change-transform">
      <EventDate />
      <EventIntroCard />
      {eventsData.map(renderEventCards)}
      <RulesSection />
    </main>
  );
});
