"use client";

import { memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RulesSection } from "../rules/rules-section";

import { EventDate } from "./event-date-section";
import { EventIntroCard } from "./event-intro-section";
import { eventsData, type EventsData } from "@/lib/data/events";
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

EventsSection.displayName = "EventsSection";
