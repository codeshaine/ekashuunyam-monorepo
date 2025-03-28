import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

// export const EventDetailsModal = ({
//   isOpen,
//   onClose,
//   title,
//   themeTitle,
//   color,
//   heads,
//   rules,
// }: EventDetailsModalProps) => {
//   if (!isOpen) return null;

//   if (themeTitle === "Coding") {
//   }
//   return (
//     <div className="fixed inset-0 top-0 z-[100] flex items-center justify-center">
//       <div
//         className="relative w-[20rem] p-10 sm:w-[25rem] md:w-[30rem] lg:w-[35rem]"
//         style={{ backgroundColor: `#${color}` }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-white hover:text-gray-200"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="mb-4 text-4xl font-bold text-white">{themeTitle}</h2>

//         <div className="space-y-4 text-white">
//           <h3 className="text-2xl font-semibold">{title}</h3>

//           <div className="rounded bg-stone-950 p-4">
//             <h4 className="mb-2 text-xl font-bold">Event Rules</h4>
//             {/* <p>{description}</p> */}
//             <ul className="mt-2 list-disc pl-5">
//               {rules?.map((r, i) => <li key={i}>{r}</li>)}
//             </ul>
//           </div>

//           <div className="rounded bg-stone-950 p-4">
//             <h4 className="mb-2 text-xl font-bold">Event Heads</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {heads?.map((h, i) => (
//                 <div key={i}>
//                   <p className="font-semibold">{h.name}r</p>
//                   <div className="flex w-full flex-col items-start justify-start gap-4 py-2">
//                     <Link
//                       target="_blank"
//                       href={`tel:${h.contact}`}
//                       className={`flex items-center justify-between gap-2 rounded-xl px-3 py-1`}
//                       style={{ backgroundColor: `#${color}` }}
//                     >
//                       <PhoneCall height={18} width={18} />
//                       Phone
//                     </Link>

//                     <Link
//                       target="_blank"
//                       href={`https://wa.me/${h.contact}`}
//                       className={`flex items-center justify-between gap-2 rounded-xl px-3 py-1`}
//                       style={{ backgroundColor: `#${color}` }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="18"
//                         height="18"
//                         fill="currentColor"
//                       >
//                         <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
//                       </svg>
//                       Chat
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const OnePieceEventModal = ({
  children,
  eventData,
}: {
  children: React.ReactNode;
  eventData: {
    id: string;
    title: string;
    themeTitle: string;
    description: string;
    image: string;
    participants: number | string;
    color: string;
    heads: { name: string; contact: string }[];
    rules: string[];
  };
}) => {
  const {
    id,
    title,
    themeTitle,
    description,
    image,
    participants,
    color,
    heads,
    rules,
  } = eventData;

  let flag = false;

  switch (id) {
    case "robin":
      flag = true;
      break;
    case "zoro":
      flag = true;
      break;
    case "sanji":
      flag = true;
      break;
    case "chopper":
      flag = true;
      break;
    case "brook":
      flag = true;
      break;
    default:
      break;
  }

  return (
    <Dialog key={id}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-lg border-4 border-amber-600 bg-blue-950 p-0 text-white sm:max-w-[500px]">
        {/* Header with Image and Main Info */}
        <div className="relative w-full">
          {/* Background Image */}
          <div className="absolute top-0 h-48 w-full overflow-hidden">
            {/* Black gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

            {/* Background Image */}
            <Image
              src={image || "/api/placeholder/500/300"}
              alt={title}
              className="h-full w-full object-cover"
              fill
              style={{
                filter: "brightness(0.5)",
              }}
            />

            {/* Blue gradient overlay fading to transparent */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent"></div>
          </div>

          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold capitalize text-amber-300">
                {themeTitle}
              </span>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>

          {/* One Piece themed corner decoration */}
          <div className="absolute right-0 top-0 h-16 w-16 -translate-y-8 translate-x-8 rotate-45 bg-amber-600"></div>
          <div className="absolute left-0 top-0 m-2 h-4 w-4 rounded-full bg-amber-600"></div>
        </div>

        {/* Content */}
        <ScrollArea className="px-6 py-2">
          {/* Description */}
          <div className="mb-2 border-b border-amber-600/40 pb-3">
            <p className="text-gray-200">{description}</p>
          </div>

          <p className="mb-2 flex w-fit items-end justify-end gap-1 bg-blue-900/50 px-2 py-1">
            <span className="font-bold">{participants}</span> make a team
          </p>

          {/* Team Heads */}
          <div className="mb-4">
            <h3 className="mb-2 flex items-center font-bold text-amber-300">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-300"></span>
              Team Heads
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {heads.map((head, index) => (
                <div
                  key={index}
                  className="rounded border border-amber-600/40 bg-blue-900/50 p-2"
                >
                  <div className="mb-1 text-sm font-medium capitalize">
                    {head.name}
                  </div>
                  <div
                    className={`flex items-start justify-start gap-2 text-sm ${flag === true ? "text-white" : "text-black"}`}
                  >
                    <Link
                      target="_blank"
                      href={`tel:${head.contact}`}
                      className={`flex items-center justify-between gap-2 rounded-xl px-3 py-1`}
                      style={{ backgroundColor: `#${color}` }}
                    >
                      <PhoneCall height={16} width={16} />
                      Phone
                    </Link>

                    <Link
                      target="_blank"
                      href={`https://wa.me/91${head.contact}`}
                      className={`flex items-center justify-between gap-2 rounded-xl px-3 py-1`}
                      style={{ backgroundColor: `#${color}` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                      Chat
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-4">
            <h3 className="mb-2 flex items-center font-bold text-amber-300">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-300"></span>
              Rules of Engagement
            </h3>
            <ul className="list-inside space-y-2">
              {id === "zoro" && (
                <p className="capitalize">
                  Topics and general guidelines are present here:{" "}
                  <Link className="text-yellow-300 underline" href={"/hack"}>
                    RULESET
                  </Link>
                </p>
              )}
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-600 text-white">
                    {index + 1}
                  </span>
                  <span className="uppercase text-gray-200">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
