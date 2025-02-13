export function HeroSection() {
  return (
    <section className="container relative mx-auto px-4 py-32 text-center">
      <div className="relative z-10 space-y-8">
        <h1 className="animate-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent drop-shadow-2xl">
          EKASHUNYAM 2024
        </h1>
        <div className="space-y-4">
          <p className="text-3xl font-bold text-white/90">SDM College Ujire</p>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/80">
            An Exciting Tech Fest by IT Club featuring 8 Amazing Competitions
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10 flex items-center gap-2">
              Register Now
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
          <button className="rounded-lg border-2 border-purple-400 bg-transparent px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-white/10">
            View Events
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-900/50 to-purple-900/50 backdrop-blur-sm" />
    </section>
  );
}
