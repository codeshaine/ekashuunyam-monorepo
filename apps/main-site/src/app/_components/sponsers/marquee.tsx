import { type Sponsers, SponsersPriority } from "@/lib/data/sponsers";
import { LocateFixed, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export const SponsersMarquee = ({
  priority,
  data,
}: {
  priority: SponsersPriority;
  data: Sponsers[];
}) => {
  const high = priority === SponsersPriority.High;
  return (
    <Marquee
      direction={high ? "right" : "left"}
      autoFill
      className="cursor-pointer"
      pauseOnHover
    >
      {/* {Array.from({ length: 10 }).map((_, index) => ( */}
      <div className="flex-center gap-8 text-white">
        {data.map((brand) => (
          <div
            key={brand.name}
            className={`group mx-4 flex h-fit flex-col rounded-xl ${high ? "w-64" : "w-44"} border-2 border-black`}
          >
            <img
              src={"/images/hat.png"}
              alt={brand.name}
              className="h-36 w-full rounded-xl object-cover"
            />
            <div className="rounded-b-xl px-1 text-black transition-all duration-300 ease-in group-hover:bg-white">
              <p
                className={`mt-2 font-bold ${high ? "text-xl" : "text-sm md:text-base"}`}
              >
                {brand.name}
              </p>
              {high && <p>{brand.category}</p>}
              <div
                className={`mt-2 flex ${high ? "items-center justify-between" : "items-end justify-end"} px-2 py-2 text-base font-semibold`}
              >
                {high && (
                  <p
                    className={`${high ? "text-sm" : "text-sm"} rounded-xl bg-black px-2 text-white`}
                  >
                    <LocateFixed className="mr-2 inline-block" />{" "}
                    {brand.location}
                  </p>
                )}
                <Link
                  href={`/sponser/${brand.name.trim().toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex-center"
                >
                  <SquareArrowOutUpRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ))} */}
    </Marquee>
  );
};
