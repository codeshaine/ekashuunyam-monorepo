import { EventDetailsModalProps } from "@/lib/data/events";
import { X } from "lucide-react";

export const EventDetailsModal = ({
  isOpen,
  onClose,
  title,
  themeTitle,
  color,
  heads,
  rules,
}: EventDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 z-[100] flex items-center justify-center">
      <div
        className="relative max-w-lg rounded-xl p-8 shadow-2xl"
        style={{ backgroundColor: `#${color}` }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="mb-4 text-4xl font-bold text-white">{themeTitle}</h2>

        <div className="space-y-4 text-white">
          <h3 className="text-2xl font-semibold">Event: {title}</h3>

          <div className="rounded bg-white/20 p-4">
            <h4 className="mb-2 text-xl font-bold">Event Rules</h4>
            {/* <p>{description}</p> */}
            <ul className="mt-2 list-disc pl-5">
              {rules?.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          <div className="rounded bg-white/20 p-4">
            <h4 className="mb-2 text-xl font-bold">Event Heads</h4>
            <div className="grid grid-cols-2 gap-2">
              {heads?.map((h, i) => (
                <div key={i}>
                  <p className="font-semibold">Coordinator</p>
                  <p>{h.name}r</p>
                  <p>{h.contact}r</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
