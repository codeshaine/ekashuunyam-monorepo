"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useRef } from "react";
import { OnePieceEventModal } from "./event-card-modal";
import { type EventsData, eventsData } from "@/lib/data/events";

gsap.registerPlugin(ScrollTrigger);

export const EventCardWantedSection = () => {
  return (
    <>
      {eventsData.map((data, index) => (
        <Fragment key={index}>
          <EventSectionWantedCards data={data} />
        </Fragment>
      ))}
    </>
  );
};

const EventSectionWantedCards = ({ data }: { data: EventsData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    id,
    title,
    themeTitle,
    color,
    rules,
    heads,
    description,
    wanted,
    image,
    participants,
  } = data;

  return (
    <div
      ref={containerRef}
      className="top-0 sticky z-[2000] flex flex-wrap items-center justify-center gap-8 px-10 py-16"
    >

      <div className="relative flex flex-col gap-4">
        <img
          src={wanted ?? "/api/placeholder/500/300"}
          alt={themeTitle}
          className="z-[1000] max-h-[500px] w-full max-w-[500px] object-contain"
        />
        <OnePieceEventModal
          eventData={{
            id: id,
            title: title,
            themeTitle: themeTitle,
            description: description,
            image: image,
            participants: participants,
            color: color,
            heads: heads,
            rules: rules,
          }}
        >
          <button className="bottom-0 left-0 z-[1000] flex h-10 w-full items-center justify-center bg-[#CCA05B] font-mono font-semibold transition-colors duration-300 hover:bg-[#b5894d] hover:shadow-md">
            View More
          </button>
        </OnePieceEventModal>
      </div>

    </div>
  );
};
