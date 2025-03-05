import React from "react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { SponsorHeads } from "@/lib/data/heads";
import Image from "next/image";

export default function ContributePage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-stone-900 to-stone-950 px-4 py-20 text-white">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:h-12 md:w-12"
      >
        <MoveLeft size={20} />
      </Link>

      {/* Header Section */}
      <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center justify-center text-center">
        <h1 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Contribute
          </span>
        </h1>
        <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-red-500"></div>
        <p className="max-w-2xl text-sm text-gray-300 md:text-base">
          Thank you for your interest in sponsoring{" "}
          <span className="text-yellow-400">Ekshunyam 2.0.</span> Please contact
          any of our sponsor heads below for assistance with sponsorship
          opportunities and queries.
        </p>
      </div>

      {/* Sponsor Heads Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...SponsorHeads]
            .sort(() => Math.random() - 0.5)
            .map((sponsor, index) => (
              <div
                key={index}
                className="group flex flex-col items-center rounded-lg bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-black/40 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-transparent bg-gradient-to-r from-yellow-500 to-red-500 p-1 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{sponsor.name}</h3>
                <p className="mb-4 text-sm text-gray-400">Sponsor Head</p>
                <Link
                  href={`https://wa.me/${sponsor.phone}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-red-600 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-md"
                >
                  Contact on WhatsApp
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>Ekshunyam 2.0 — The Ultimate One Piece Festival</p>
      </div>
    </div>
  );
}
