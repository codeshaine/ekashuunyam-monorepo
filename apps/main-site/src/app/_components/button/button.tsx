'use client';

export const ButtonComponent = () => {
  return (
    <section className="flex h-screen items-center justify-center bg-red-950 text-white">
      <button 
        className="group relative w-fit overflow-hidden rounded-xl text-2xl font-medium text-yellow-100 transition-all duration-300 px-8 py-3 hover:scale-105"
        style={{
          backgroundImage: `url('/svg/button.svg')`,
          backgroundSize: '100% 100%',
          WebkitMaskImage: `url('/svg/button.svg')`,
          WebkitMaskSize: '100% 100%',
          maskImage: `url('/svg/button.svg')`,
          maskSize: '100% 100%',
        }}
      >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-transparent animate-stars" />
        </div>
        Register Your
      </button>
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(45deg);
          }
        }
        .animate-stars::before,
        .animate-stars::after {
          content: '★';
          position: absolute;
          color: #f5b942;
          font-size: 30px;
          animation: sparkle 1.5s infinite;
        }
        .animate-stars::before {
          top: 10%;
          left: 10%;
        }
        .animate-stars::after {
          top: 10%;
          right: 10%;
          animation-delay: 0.7s;
        }
      `}</style>
    </section>
  );
};