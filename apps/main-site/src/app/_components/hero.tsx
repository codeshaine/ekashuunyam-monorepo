export function HeroSection() {
  return (
    <section className="flex h-screen items-center justify-center bg-black">
      <p>
        <span className="font-sayyeda /* 1) Gradient fill (dark-to-deep blue) */ /* 2) Gold (stroke) */ /* 3) Subtle for 3D depth */ bg-clip-text text-[10rem] tracking-[0.2em] text-transparent shadow outline [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_#FFD700] [text-shadow:3px_3px_2px_rgba(0,0,0,0.6)]">
          Ekashunyam 2.
        </span>
        <span className="font-sayyeda text-[10rem] tracking-[0.2em] text-white">
          O
        </span>
      </p>
    </section>
  );
}
