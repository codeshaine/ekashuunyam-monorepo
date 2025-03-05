"use client";

import { useState } from "react";
import { Share2, Copy, MessageCircle, Link as LinkIcon } from "lucide-react";
import { toast, Toaster } from "sonner";

export function ShareButton() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  //not sure if this works in mobile in http have to check in https
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard!");
      });
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent("Join your crew: " + pageUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex justify-center">
      <Toaster />
      <div className="relative">
        <button
          onClick={() => setIsShareOpen(!isShareOpen)}
          className="flex w-full items-center justify-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Share2 size={20} />
          <span className="font-semibold">Share </span>
        </button>

        {isShareOpen && (
          <div className="absolute left-1/2 z-50 mt-4 w-56 -translate-x-3/4 transform overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl md:w-80 md:-translate-x-1/2 lg:w-80 lg:-translate-x-1/2">
            <div className="py-2">
              <div className="mb-2 px-4 text-center font-semibold text-gray-700">
                Share Community Links
              </div>
              <button
                onClick={handleCopyToClipboard}
                className="flex w-full items-center px-4 py-3 transition-colors hover:bg-gray-100"
              >
                <LinkIcon className="mr-3 text-blue-600" size={20} />
                <span className="text-gray-800">Copy Link</span>
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="flex w-full items-center px-4 py-3 transition-colors hover:bg-gray-100"
              >
                <MessageCircle className="mr-3 text-green-600" size={20} />
                <span className="text-gray-800">Share on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
