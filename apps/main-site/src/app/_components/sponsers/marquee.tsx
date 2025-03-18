import { type Sponsers, SponsersPriority } from "@/lib/data/sponsers";
import { LocateFixed } from "lucide-react";
import Marquee from "react-fast-marquee";

export const SponsersMarquee = ({
  priority,
  data,
  dir,
}: {
  priority: SponsersPriority;
  data: Sponsers[];
  dir: "left" | "right";
}) => {
  const high = priority === SponsersPriority.High;
  return (
    <Marquee direction={dir} autoFill className="cursor-pointer my-8" pauseOnHover>
      <div className="flex-center gap-8 text-white">
        {data.map((brand) => (
          <div
            key={brand.brandName}
            className={`group mx-4 px-4 py-3 flex h-fit flex-col rounded-xl ${high ? "min-w-64" : "min-w-44"} overflow-hidden border-2 border-black`}
          >
            <div className="rounded-b-xl px-1 text-black transition-all duration-300 ease-in group-hover:bg-white">
              <p
                className={`mt-2 font-bold ${high ? "text-2xl" : "text-sm md:text-base"}`}
              >
                {brand.brandName}
              </p>
              {brand.name && <p>{brand.name}</p>}
              <div
                className={`mt-2 flex justify-start py-2 text-base font-semibold`}
              >
                {high && brand.location && (
                  <p
                    className={`${high ? "text-sm" : "text-sm"} rounded-xl bg-black px-2 text-white`}
                  >
                    <LocateFixed className="mr-2 inline-block" />{" "}
                    {brand.location}
                  </p>
                )}
                {!high && brand.location && (
                  <p
                    className={`${high ? "bg-black text-sm" : "bg-[#0000009f] text-sm"} rounded-xl px-2 text-white`}
                  >
                    <LocateFixed className="mr-2 inline-block" />{" "}
                    {brand.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Marquee>
  );
};
