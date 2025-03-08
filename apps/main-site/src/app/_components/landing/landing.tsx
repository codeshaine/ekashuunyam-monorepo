// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export const Landing = () => {
//   const sectionRef = useRef(null);
//   const cloudRef = useRef(null);
//   const luffyRef = useRef(null);
//   const fruit1Ref = useRef(null);
//   const fruit2Ref = useRef(null);
//   const hatRef = useRef(null);
//   const katanaRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // Use a single ScrollTrigger with staggered animations
//     const mainTrigger = ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top top",
//       end: "+=100%",
//       scrub: 0.5,
//       onUpdate: (self) => {
//         const progress = self.progress;

//         // Use GSAP's quickTo for more efficient updates
//         gsap.quickTo(luffyRef.current, "rotate", { duration: 0.5 })(
//           progress * 90,
//         );
//         gsap.quickTo(luffyRef.current, "y", { duration: 0.5 })(-150 * progress);
//         gsap.quickTo(luffyRef.current, "scale", { duration: 0.5 })(
//           1 - 0.2 * progress,
//         );
//       },
//     });

//     // Use will-change for hardware acceleration
//     gsap.set(
//       [
//         luffyRef.current,
//         cloudRef.current,
//         fruit1Ref.current,
//         fruit2Ref.current,
//       ],
//       {
//         willChange: "transform, opacity",
//         force3D: true,
//       },
//     );

//     // Optimize individual animations
//     const optimizedAnimations = [
//       { ref: fruit1Ref, props: { x: -150, y: -130, rotate: 45, opacity: 0 } },
//       { ref: fruit2Ref, props: { x: 150, y: 130, rotate: -45, opacity: 0 } },
//       { ref: hatRef, props: { x: 130, y: -140, rotate: 45, opacity: 0 } },
//       { ref: katanaRef, props: { x: -130, y: 140, rotate: -45, opacity: 0 } },
//     ];

//     optimizedAnimations.forEach(({ ref, props }) => {
//       gsap.to(ref.current, {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=100%",
//           scrub: 1,
//         },
//         ...props,
//       });
//     });

//     return () => {
//       mainTrigger.kill();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div ref={sectionRef} className="relative h-screen overflow-hidden">
//       {/* Background Cloud */}
//       <img
//         ref={cloudRef}
//         src="/images/cloud.jpg"
//         alt="cloud"
//         className="absolute inset-0 h-full w-full object-cover object-bottom"
//       />

//       {/* Heading Text */}
//       <img
//         ref={textRef}
//         src="/svg/text.svg"
//         className="heading-text absolute left-1/2 top-[25%] z-10 h-24 -translate-x-1/2 px-4 text-3xl font-bold text-white"
//       ></img>

//       {/* Centered Luffy */}
//       <img
//         ref={luffyRef}
//         src="/images/luffy.png"
//         alt="luffy"
//         className="absolute left-1/2 top-3/4 z-20 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 object-contain"
//       />

//       {/* Scattered Devil Fruits */}
//       <img
//         ref={fruit1Ref}
//         src="/images/devilfruit.png"
//         alt="devilfruit"
//         className="absolute left-[20%] top-[15%] h-24 w-24 rotate-12 object-contain"
//       />
//       <img
//         ref={fruit2Ref}
//         src="/images/devilfruit.png"
//         alt="devilfruit"
//         className="absolute right-[25%] top-[70%] h-24 w-24 -rotate-12 object-contain"
//       />

//       {/* Scattered Hats */}
//       <img
//         ref={hatRef}
//         src="/images/katana.png"
//         alt="hat"
//         className="absolute right-[15%] top-[25%] h-28 w-28 rotate-6 object-contain"
//       />
//       <img
//         ref={katanaRef}
//         src="/images/hat.png"
//         alt="hat"
//         className="absolute bottom-[20%] left-[30%] h-24 w-24 -rotate-12 object-contain"
//       />
//     </div>
//   );
// };
