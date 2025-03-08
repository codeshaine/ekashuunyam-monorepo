import { signOut } from "@/server/auth";
import { LogOut } from "lucide-react";
import "@/styles/login.css";

export default function SignOutPage() {
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
              Farewell!
            </h2>
            <p className="text-lg text-gray-600">
              Until we meet again on the next adventure
            </p>
          </div>

          <form
            className="space-y-6 rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-2xl"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <div className="space-y-3 text-center">
              <h5 className="text-2xl font-semibold text-gray-900">
                Ready to sign out?
              </h5>
              <p className="text-gray-600">
                Thank you for sailing with us. You can always return to the crew
                anytime!
              </p>
            </div>

            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Sign out
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
