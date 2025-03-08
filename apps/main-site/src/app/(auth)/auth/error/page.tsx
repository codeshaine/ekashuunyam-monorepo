"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import '@/styles/login.css'

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-lg bg-blue-50 px-2 py-1 font-mono text-sm text-blue-600">
        Configuration
      </code>
    </p>
  ),
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50">
      {/* Wave Background */}
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

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* One Piece Logo */}
          <div className="space-y-4 text-center">
            <div className="mx-auto mb-6 h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#FFD700"
                  stroke="#000"
                  strokeWidth="2"
                />
                <path
                  d="M25 65 C35 65, 45 35, 75 35"
                  stroke="#000"
                  strokeWidth="4"
                  fill="none"
                />
                <circle cx="35" cy="45" r="8" fill="#000" />
                <circle cx="65" cy="45" r="8" fill="#000" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              Oops!
            </h2>
            <p className="text-lg text-gray-600">
              Looks like we hit a rough wave
            </p>
          </div>

          <div className="space-y-6 rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-2xl">
            <div className="space-y-4">
              <div className="text-gray-600">
                {errorMap[error] || "Please contact us if this error persists."}
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/login"
                className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center">
                  Try again
                </span>
              </Link>

              <Link
                href="mailto:shainilps.work@gmail.com"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-100 bg-white/90 px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-200 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact your Nakama
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
