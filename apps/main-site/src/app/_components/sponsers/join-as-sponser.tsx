import { WhySponsor } from "@/lib/data/sponsers";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const JoinAsSponsor = () => {
    return (
      <div 
        className="relative min-h-screen bg-[#f5e6d3] p-4 sm:p-8 text-sm"
        style={{
          backgroundImage: `url('/images/101.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container  mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 sm:space-y-8">
          <h1 className="text-center font-sayyeda tracking-widest text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            JoIN oUR PIRATE ALLIANCE
          </h1>
          
          <p className="text-center font-sayyeda tracking-widest text-xs sm:text-sm md:text-base text-gray-800">
            Set Your Flag <span className="mx-2">🏴‍☠️</span> Alongside Ours on the Grand Line of Innovation
          </p>
          
          <div className="max-w-2xl px-4 text-center">
            <p className="mb-6 text-sm sm:text-base md:text-lg">
              Are you ready to sail with us on this legendary voyage? By sponsoring{" "}
              <span className="font-bold text-red-600">Ekashunyam 2.0</span>, 
              you'll be supporting one of the most prestigious intercollegiate 
              fests while gaining maximum visibility among students, tech 
              enthusiasts, and industry leaders.
            </p>
            
            <Link 
              href="/contribute"
              className="inline-block rounded-lg border-4 border-black bg-[#ffc107] 
              px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 
              text-base sm:text-lg md:text-xl 
              font-bold shadow-lg 
              transition-transform hover:scale-105"
            >
              Join as a Sponsor !
            </Link>
          </div>
          
          <div className="w-full max-w-3xl px-4">
            <h2 className="font-pirate mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-semibold text-center">
              Why Sponsor Us?
            </h2>
            
            <div className="space-y-2 sm:space-y-3">
              {WhySponsor.map((item) => (
                <div 
                  key={item.title}
                  className="flex flex-col sm:flex-row items-start gap-2 
                  bg-white/50 p-3 rounded-lg shadow-sm"
                >
                  <p className="font-semibold flex items-center mb-1 sm:mb-0">
                    <CheckCircle className="mr-2 w-5 h-5 text-green-600" />
                    {item.title}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 sm:ml-8">
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