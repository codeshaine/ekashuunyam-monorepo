import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-center h-screen bg-c-250 p-10">
      <div className="capitalize text-[#1e1d1d]">
        <div className="lg:24 b-200 flex flex-col items-center justify-center gap-8 md:mx-32 xl:mx-80">
          <div className="flex-center gap-4 md:gap-6">
            <p className="py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              4
            </p>
            {/* Have to change this png */}
            <img
              src="/images/skull.png"
              alt="O"
              className="h-28 w-28 bg-red-100"
            />
            <p className="py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              4
            </p>
          </div>
          <div className="p-6 pt-2">
            <p className="flex flex-col gap-4 text-center font-sans text-sm font-light md:text-xl">
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
