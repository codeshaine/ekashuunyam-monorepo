import { auth } from "@/server/auth";
import { HeroSection } from "@/app/_components/hero";

export default async function Home() {
  const user = await auth();
  return (
    <main className="">
      <HeroSection />
      <section className="flex h-screen items-center justify-center bg-red-950 text-white">
        Demo section
      </section>



      {/*---- Previous code ----*/}
      {/* <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Featured Attractions
          </h2>
          <p className="text-lg text-gray-300">
            Discover the magic that awaits you
          </p>
        </div>
      </section> */}
      {/* {!user && (
        <div className="fixed bottom-8 right-8 animate-bounce">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            Join Now
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      )} */}
    </main>
  );
}
