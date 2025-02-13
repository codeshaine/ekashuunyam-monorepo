"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-lg bg-violet-50 px-2 py-1 font-mono text-sm text-violet-600">
        Configuration
      </code>
    </p>
  ),
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-8 rounded-3xl border border-violet-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl">
          <div className="relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 shadow-lg ring-8 ring-white/80">
                <AlertCircle className="h-10 w-10 animate-pulse text-rose-600" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h5 className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
              Something went wrong
            </h5>

            <div className="text-gray-600">
              {errorMap[error] || "Please contact us if this error persists."}
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center">
                Try again
              </span>
            </Link>

            <Link
              href="mailto:shainilps.work@gmail.com"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white/80 px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-violet-200 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
