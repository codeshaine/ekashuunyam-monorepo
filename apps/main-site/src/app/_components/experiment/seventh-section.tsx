// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const boxes = [
//   {
//     image: "/pfp/gear_5.jpg",
//     name: "Digital Innovation",
//     caption: "Transforming ideas into digital reality",
//   },
//   {
//     image: "/pfp/sanji.jpeg",
//     name: "Creative Solutions",
//     caption: "Crafting unique digital experiences",
//   },
//   {
//     image: "/pfp/zoro.jpeg",
//     name: "Future Technology",
//     caption: "Pushing boundaries of what's possible",
//   },
// ];

// export const SeventhSection = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const boxes = gsap.utils.toArray(".box-item");

//     gsap.set(boxes, {
//       scale: 0.3,
//     });

//     gsap.to(boxes, {
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 1.5,
//       },
//       keyframes: {
//         "0%": { scale: 0.9,  },
//         "50%": { scale: 1, },
//         "100%": { scale: 0.9, },
//       },
//       y:100,
//       ease: "power2.inOut",
//     });

 
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="flex min-h-screen w-full items-center justify-center bg-black/90 py-16"
//     >
//       <div className="cnt mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {boxes.map((box, index) => (
//             <div
//               key={index}
//               className="box-item group relative overflow-hidden rounded-xl bg-white/5  hover:bg-white/10"
//             >
//               <div className="aspect-[4/3] overflow-hidden">
//                 <img
//                   src={box.image}
//                   alt={box.name}
//                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
//                   {box.name}
//                 </h3>
//                 <p className="text-sm text-gray-400 md:text-base">
//                   {box.caption}
//                 </p>
//               </div>
//               <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
