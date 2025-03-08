"use client";

import { useRef } from "react";

export const EleventhSection = () => {
  const luffyRef = useRef(null);

  return (
    <div className="h-screen w-full bg-black">
      <img
        src="/images/scifi.jpg"
        alt="scifi"
        className="h-full w-full object-cover"
      />
      <img
        src="/svg/text.svg"
        alt="text"
        className="absolute left-[50%] top-[30%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <img
        ref={luffyRef}
        src="/svg/luffy.svg"
        alt="luffy"
        className="absolute left-[50%] top-[50%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
};
