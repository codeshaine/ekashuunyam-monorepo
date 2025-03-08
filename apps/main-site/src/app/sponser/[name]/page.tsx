"use client";

import { sponsersData, SponsersPriority } from "@/lib/data/sponsers";
import gsap from "gsap";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { type MutableRefObject, useEffect, useRef, useState } from "react";

export default function SponsorsPage() {
  const { name } = useParams();
  const router = useRouter();
  if (!name) {
    router.push("/not-found");
  }

  const filteredSponsors = sponsersData.find(
    (f) => f.name.trim().toLowerCase().replace(/\s+/g, "-") === name,
  );

  let cardStyle = "rounded-xl overflow-hidden transition-all duration-300";
  let headerStyle = "p-4";
  let contentStyle = "p-6";

  if (filteredSponsors?.priority === SponsersPriority.High) {
    cardStyle +=
      " bg-gradient-to-br from-yellow-800 to-yellow-900 border-2 border-yellow-500 shadow-xl transform hover:scale-105";
    headerStyle += " bg-yellow-700";
    contentStyle += " bg-opacity-80";
  } else {
    cardStyle +=
      " bg-gradient-to-br from-gray-700 to-gray-800 shadow-md hover:shadow-lg";
    headerStyle += " bg-gray-600";
  }

  useEffect(() => {
    if (!name || !filteredSponsors) {
      router.push("/not-found");
    }
  }, [name, filteredSponsors, router]);

  //what was this piece of code trying to do
  // if (!filteredSponsors) {
  //   return null;
  // }

  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);
  const wave3Ref = useRef(null);
  const wave4Ref = useRef(null);

  const wavePaths = {
    wave1: {
      start:
        "M0,96L48,128C96,160,192,224,288,256C384,288,480,288,576,282.7C672,277,768,267,864,272C960,277,1056,299,1152,309.3C1248,320,1344,320,1392,320L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      end: "M0,256L48,261.3C96,267,192,277,288,282.7C384,288,480,288,576,245.3C672,203,768,117,864,74.7C960,32,1056,32,1152,69.3C1248,107,1344,181,1392,218.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
    wave2: {
      start:
        "M0,192L48,165.3C96,139,192,85,288,80C384,75,480,117,576,160C672,203,768,245,864,224C960,203,1056,117,1152,85.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      end: "M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,165.3C672,128,768,96,864,85.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
    wave3: {
      start:
        "M0,96L48,80C96,64,192,32,288,58.7C384,85,480,171,576,208C672,245,768,235,864,213.3C960,192,1056,160,1152,170.7C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      end: "M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,106.7C672,85,768,43,864,48C960,53,1056,107,1152,149.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
    wave4: {
      start:
        "M0,32L48,58.7C96,85,192,139,288,138.7C384,139,480,85,576,53.3C672,21,768,11,864,32C960,53,1056,107,1152,128C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      end: "M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,208C672,213,768,235,864,245.3C960,256,1056,256,1152,245.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
  };

  useEffect(() => {
    // Animate each wave
    const animateWave = (
      ref: MutableRefObject<null>,
      paths: { start: string; end: string },
      duration = 4,
    ) => {
      gsap.set(ref.current, {
        willChange: "attr",
        force3D: true,
      });

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      tl.fromTo(
        ref.current,
        {
          attr: {
            d: paths.start,
          },
        },
        {
          duration: duration,
          attr: {
            d: paths.end,
          },
          ease: "sine.inOut",
        },
      );

      return tl;
    };

    // Create wave animations with different speeds
    const wave1Timeline = animateWave(wave1Ref, wavePaths.wave1, 5);
    const wave2Timeline = animateWave(wave2Ref, wavePaths.wave2, 4);
    const wave3Timeline = animateWave(wave3Ref, wavePaths.wave3, 3);
    const wave4Timeline = animateWave(wave4Ref, wavePaths.wave4, 2);

    // Cleanup
    return () => {
      wave1Timeline.kill();
      wave2Timeline.kill();
      wave3Timeline.kill();
      wave4Timeline.kill();

      [wave1Ref, wave2Ref, wave3Ref, wave4Ref].forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { clearProps: "all" });
        }
      });
    };
  }, []);

  useEffect(() => {
    const anim = gsap.to(".cnt", {
      x: () => Math.random() * 20 - 10,
      y: () => Math.random() * 20 - 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 2,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const [viewBox, setViewBox] = useState("0 0 1440 320");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setViewBox("0 0 600 320");
      } else {
        setViewBox("0 0 1440 320");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center bg-[#F5EDE7] text-white">
      <button
        onClick={() => router.back()}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-stone-950 text-white backdrop-blur-sm transition-all duration-300 hover:bg-stone-800 md:h-12 md:w-12"
      >
        <MoveLeft size={20} />
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full"
      >
        <path ref={wave4Ref} d={wavePaths.wave4.start} fill="#7FD5F5" />
        <path ref={wave3Ref} d={wavePaths.wave3.start} fill="#24ABEF" />
        <path ref={wave2Ref} d={wavePaths.wave2.start} fill="#076EC9" />
        <path ref={wave1Ref} d={wavePaths.wave1.start} fill="#034697" />
      </svg>
      {/* Sponsors Grid */}
      <div className="cnt flex-center w-full min-w-96 p-6">
        <div className="w-[30rem] lg:w-[35rem]">
          <div className={cardStyle}>
            {/* Card Header with Image */}
            <div className={headerStyle}>
              {/* <Image
                fill
                src={filteredSponsors?.image}
                alt={filteredSponsors?.name}
                className="h-48 w-full rounded object-cover"
              /> */}
            </div>

            {/* Card Content */}
            <div className={contentStyle}>
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-bold">{filteredSponsors?.name}</h3>

                {/* Priority Badge */}
                {filteredSponsors?.priority === SponsersPriority.High && (
                  <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    YONKO
                  </span>
                )}

                {filteredSponsors?.priority === SponsersPriority.Low && (
                  <span className="rounded-full bg-gray-500 px-3 py-1 text-xs font-bold text-white">
                    CREW
                  </span>
                )}
              </div>

              <p className="mb-4 text-sm text-gray-300">
                {filteredSponsors?.category} • {filteredSponsors?.location}
              </p>
              <p className="mb-4">{filteredSponsors?.description}</p>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold">Email :</span>{" "}
                  <Link
                    href={`mailto:${filteredSponsors?.email}`}
                    className="cursor-pointer"
                  >
                    {filteredSponsors?.email}
                  </Link>
                </p>

                {/* Contact button styling varies by priority */}
                <div className="mt-4 flex space-x-2">
                  {filteredSponsors?.priority === SponsersPriority.High ? (
                    <>
                      <Link
                        target="_blank"
                        href={`${filteredSponsors?.website}`}
                        className="flex-1 rounded bg-yellow-600 px-4 py-2 text-center text-white hover:bg-yellow-500"
                      >
                        Visit Website
                      </Link>
                      <Link
                        target="_blank"
                        href={`https://wa.me/${filteredSponsors?.phone}`}
                        className="flex flex-1 items-center justify-center gap-4 rounded bg-yellow-800 px-4 py-2 text-center text-white hover:bg-yellow-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                        >
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>

                        <p>Contact</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`${filteredSponsors?.website}`}
                        target="_blank"
                        className="flex-1 rounded bg-gray-600 px-4 py-2 text-center text-white hover:bg-gray-500"
                      >
                        Website
                      </Link>
                      <Link
                        href={`https://wa.me/${filteredSponsors?.phone}`}
                        target="_blank"
                        className="flex flex-1 items-center justify-center gap-4 rounded bg-gray-700 px-4 py-2 text-center text-white hover:bg-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                        >
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>

                        <p>Contact</p>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
