"use client";

import Marquee from "react-fast-marquee";

const cnt = [
  { name: "Brook", img: "/pfp/brook.jpeg" },
  { name: "Chopper", img: "/pfp/chopper.jpeg" },
  { name: "Sanji", img: "/pfp/sanji.jpeg" },
  { name: "Luffy", img: "/pfp/luffy.jpeg" },
  { name: "Zoro", img: "/pfp/zoro.jpeg" },
  { name: "Usopp", img: "/pfp/usopp.jpeg" },
  { name: "Jimbei", img: "/pfp/jimbei.jpeg" },
  { name: "Nami", img: "/pfp/nami.jpeg" },
  { name: "Robin", img: "/pfp/robin.jpeg" },
  { name: "Gear_5", img: "/pfp/gear_5.jpg" },
];

export const NinthSection = () => {
  return (
    <div className="flex h-screen flex-col gap-16 bg-slate-900 py-44">
      <div className="flex -rotate-3 flex-col gap-10">
        <Marquee
          speed={70}
          direction="left"
          autoFill
          //   pauseOnHover
          className="cursor-pointer"
          gradient
          gradientColor="#1c1917"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <MyComponent key={index} index={index} />
          ))}
        </Marquee>

        <Marquee
          direction="right"
          autoFill
          //   pauseOnHover
          className="cursor-pointer"
          gradient
          gradientColor="#1c1917"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <MyComponent key={index} index={index} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

const MyComponent = ({ index }: { index: number }) => {
  return (
    <div className="flex-center text-white">
      {cnt.map((character) => (
        <div key={character.name} className="mx-4 flex h-fit w-36 flex-col">
          <img
            src={character.img}
            alt={character.name}
            className="object-cover rounded-full"
          />
          <p className="mt-2 text-center text-sm text-slate-500">
            {character.name}
          </p>
        </div>
      ))}
    </div>
  );
};
