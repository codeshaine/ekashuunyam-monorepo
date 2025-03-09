import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const BrochureSection = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden py-8"
      style={{
        backgroundImage: `url('/images/101.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-4 flex w-full flex-col items-end justify-end gap-4 px-8  tracking-widest lg:py-10">
        <p className="text-center text-4xl font-semibold lg:text-7xl font-sayyeda">
          ADvENTURE Log
        </p>
        <p className="text-center text-sm font-light">
          Download the full event guide, schedule, and details here!
        </p>
      </div>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-8 px-32 py-12 lg:flex-row">
        <div className="flex-center h-full flex-1 flex-col gap-8 lg:pb-44">
          <p className="w-[22rem] px-2 text-center text-2xl font-semibold lg:w-[32rem] lg:text-5xl">
            Join the Ultimate Tech Pirates &apos; Journey
          </p>
          <div className="flex-center w-full lg:w-96">
            <Link
              href="/form/register"
              className="inline-block rounded-xl border border-black bg-[#ffc107] px-6 py-2 text-base font-bold shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-lg md:px-12 md:py-4 md:text-xl"
            >
              Register your crew !
            </Link>
          </div>
        </div>
        <div className="flex-center h-full flex-1 px-3">
          <div className="relative h-[25rem] w-[20rem] rotate-3 bg-yellow-500 md:w-[25rem] lg:h-[32rem]">
            <Image
              width={112}
              height={112}
              src="/images/pin.png"
              alt=""
              className="absolute -left-[2rem] -top-[2rem] h-28 w-28 object-cover"
            />
            <p  className="px-16">Image yet to be added</p>
          </div>
        </div>
      </div>
      <div className="flex-center w-full flex-col gap-2 py-8">
        <div className="flex-center flex-col text-center text-sm font-light md:flex-row">
          <p>Stay Updated with us </p>
          <Link
            href={`https://www.instagram.com/ekashunyam2.0/`}
            className="ml-2 font-semibold text-stone-950"
          >
            @ekashunyam2.0 <Instagram size={20} className="ml-2 inline-block" />
          </Link>
        </div>
        <div className="flex-center flex-col text-center text-sm font-light md:flex-row">
          <p>For any Queries or Help Please visit </p>
          <Link
            href={`https://www.instagram.com/ekashunyam2.0/`}
            className="ml-2 font-semibold text-stone-950"
          >
            @ekashunyam2.0/support
          </Link>
        </div>
      </div>
    </div>
  );
};
