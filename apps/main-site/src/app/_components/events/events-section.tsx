"use client";

import { memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RulesSection } from "../rules/rules-section";
import { EventDate } from "./event-date-section";
import { EventCardWantedSection } from "./event-card-wanted-section";
gsap.registerPlugin(ScrollTrigger);

export const EventsSection = memo(() => {
  // const renderEventCards = useCallback(
  //   (event: EventsData, index: number) => (
  //     <Eventcards key={event.id} {...event} index={index} />
  //   ),
  //   [],
  // );

  return (
    <main className="relative bg-gray-950 will-change-transform">
      <EventDate />
      <EventCardWantedSection />
      {/* <EventIntroCard />
      {eventsData.map(renderEventCards)} */}
      {/* */}
      {/* <div className="w-screen h-[150vh]"></div> */}
    </main>
  );
});

EventsSection.displayName = "EventsSection";
