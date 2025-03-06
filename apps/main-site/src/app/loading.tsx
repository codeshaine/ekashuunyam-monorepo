import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex-center h-screen bg-c-250 p-10">
      <div className="capitalize text-[#1e1d1d]">
        <div className="lg:24 b-200 flex flex-col items-center justify-center gap-8 md:mx-32 xl:mx-80">
          <div className="flex-center gap-4 md:gap-6">
            <p className="animate-pulse py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              L
            </p>
            <div className="relative h-28 w-28 animate-spin">
              <Image
                src="/images/skull.png"
                alt="O"
                fill
                className="object-cover"
              />
            </div>
            <p className="animate-pulse py-4 text-center font-sans text-8xl font-bold sm:text-[10rem]">
              D
            </p>
          </div>
          <div className="p-6 pt-2">
            <p className="flex animate-pulse flex-col gap-4 text-center font-sans text-sm font-light md:text-xl">
              Hold on tight, summoning the content...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
