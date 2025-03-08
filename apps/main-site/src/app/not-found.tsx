import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";
import "@/styles/waves.css";

export default async function NotFound() {

  return (
    <div className="flex-center relative h-screen bg-c-250 p-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 1440 320`}
        className="absolute bottom-0"
        preserveAspectRatio="none"
      >
        <path className="wave4" />
        <path className="wave3" />
        <path className="wave2" />
        <path className="wave1" />
      </svg>
      <div className="z-10 capitalize text-[#1e1d1d]">
        <div className="lg:24 b-200 flex flex-col items-center justify-center md:mx-32 xl:mx-80">
          <div className="flex-center gap-4 md:gap-6">
            <p className="py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              4
            </p>
            <div className="relative h-28 w-28 ">
              <Image
                src="/images/skull.png"
                alt="O"
                fill
                sizes="100%"
                className="slow-spin animate-spin object-cover"
              />
            </div>
            <p className="py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              4
            </p>
          </div>
          <div className="p-6 pt-2 ">
            <p className="flex flex-col gap-4 text-center font-sans text-sm font-light md:text-sm">
              The page you are looking for might have been removed,
              <br /> had its name changed or is temporarily unavailable.
            </p>
            <div className="flex-center pt-6">
              <Button className="font-heart">
                <Link href={"/"} className="flex-center gap-2">
                  <p>Fallback</p> <Zap />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
