import { WhySponsor } from "@/lib/data/sponsers";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const JoinAsSponsor = () => {
  return (
    <div
      className="relative min-h-screen bg-[#f5e6d3] p-4 text-sm sm:p-8"
      style={{
        backgroundImage: `url('/images/101.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 sm:space-y-8">
        <h1 className="text-center font-sayyeda text-3xl font-semibold tracking-widest sm:text-4xl md:text-5xl lg:text-6xl">
          JoIN oUR PIRATE ALLIANCE
        </h1>

        <p className="text-center font-sayyeda text-xs tracking-widest text-gray-800 sm:text-sm md:text-base">
          Set Your Flag <span className="mx-2">🏴‍☠️</span> Alongside Ours on the
          Grand Line of Innovation
        </p>

        <div className="max-w-2xl px-4 text-center">
          <p className="mb-6 text-sm sm:text-base md:text-lg">
            Are you ready to sail with us on this legendary voyage? By
            sponsoring{" "}
            <span className="font-bold text-red-600">Ekashunyam 2.0</span>,
            you&#39;ll be supporting one of the most prestigious intercollegiate
            fests while gaining maximum visibility among students, tech
            enthusiasts, and industry leaders.
          </p>

          <Link
            href="/contribute"
            className="inline-block rounded-lg border-4 border-black bg-[#ffc107] px-6 py-2 text-base font-bold shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-lg md:px-12 md:py-4 md:text-xl"
          >
            Join as a Sponsor !
          </Link>
        </div>

        <div className="w-full max-w-3xl px-4">
          <h2 className="font-pirate mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">
            Why Sponsor Us?
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {WhySponsor.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-2 rounded-lg bg-white/50 p-3 shadow-sm sm:flex-row"
              >
                <p className="mb-1 flex items-center font-semibold sm:mb-0">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  {item.title}
                </p>
                <p className="text-sm text-gray-700 sm:ml-8 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
