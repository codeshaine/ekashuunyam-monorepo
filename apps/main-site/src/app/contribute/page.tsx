"use client";

import React from "react";
import { MoveLeft, Anchor } from "lucide-react";
import Link from "next/link";
import { SponsorHeads } from "@/lib/data/heads";
import { useRouter } from "next/navigation";
import '@/styles/login.css'

export default function ContributePage() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-100 to-sky-300 px-4 py-20 text-slate-800">
      
      <div className="absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
           <path className="wave1" fill="#60bff5" />
          <path className="wave2" fill="#50a7e2" />
          <path className="wave3" fill="#4390ce" />
          <path className="wave4" fill="#3879b9" />
          <path className="wave5" fill="#2e63a4" />
        </svg>
      </div>
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600 md:h-12 md:w-12 z-10"
      >
        <MoveLeft size={20} />
      </button>

      {/* Header Section */}
      <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center justify-center text-center relative z-10">
        <div className="mb-6 w-20 h-20 flex items-center justify-center">
          <Anchor size={64} className="text-red-600" />
        </div>
        <h1 className="mb-4 font-sans tracking-wider text-3xl font-bold  md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Contribute
          </span>
        </h1>
        <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-blue-600"></div>
        <p className="max-w-2xl text-sm text-slate-700 md:text-base font-medium">
          Thank you for your interest in sponsoring{" "}
          <span className="text-red-600 font-bold">Ekshunyam 2.0.</span> Set sail with us by contacting any of our sponsor heads below for assistance with sponsorship opportunities and queries.
        </p>
      </div>

      {/* Sponsor Heads Grid */}
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...SponsorHeads]
            .sort(() => Math.random() - 0.5)
            .map((sponsor, index) => (
              <div
                key={index}
                className="group flex flex-col items-center bg-sky-500 rounded-xl  p-6  overflow-hidden"
              >
                {/* <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-red-500 bg-gradient-to-r from-orange-400 to-red-500 p-1 transition-transform duration-500 group-hover:scale-105">
                  <div className="h-full w-full rounded-full bg-sky-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-red-600">{sponsor.name.charAt(0)}</span>
                  </div>
                </div> */}
                <h3 className="mb-2 text-base font-bold font-sans text-slate-800">{sponsor.name}</h3>
                <p className="mb-4 text-sm text-slate-600">Sponsor Head</p>
                <Link
                  href={`https://wa.me/${sponsor.phone}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-md border-2 border-yellow-400"
                >
                  Contact on WhatsApp
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Footer Section */}
      {/* <div className="mt-16 text-center relative z-10">
        <div className="mx-auto h-16 w-16 mb-4">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#2563eb" strokeWidth="5" />
            <path d="M50 20 L50 80 M20 50 L80 50" stroke="#ef4444" strokeWidth="5" />
          </svg>
        </div>
        <p className="text-red-600 font-serif text-lg font-bold">Ekshunyam 2.0 — The Ultimate One Piece Festival</p>
      </div> */}
    </div>
  );
}