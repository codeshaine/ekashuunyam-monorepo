"use client";

import React from "react";
import {
  MoveLeft,
  Anchor,
  Phone,
  Mail,
  Cpu,
  FileText,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/login.css";

export default function Support() {
  const router = useRouter();

  const supportTeam = [
    {
      name: "Suhas",
      role: "General Support",
      phone: "+91 98765 43210",
      icon: <Phone size={24} />,
    },
    {
      name: "Amshitha",
      role: "General Support",
      phone: "+91 98765 43211",
      icon: <Phone size={24} />,
    },
    {
      name: "Karunya",
      role: "Registration",
      phone: "+91 98765 43212",
      icon: <FileText size={24} />,
    },
    {
      name: "Prajna",
      role: "Registration",
      phone: "+91 98765 43213",
      icon: <FileText size={24} />,
    },
    {
      name: "Shainil",
      role: "Technical Support",
      phone: "+91 98765 43214",
      icon: <Cpu size={24} />,
    },
    {
      name: "Swasthik",
      role: "Technical Support",
      phone: "+91 98765 43215",
      icon: <Cpu size={24} />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-sky-100 to-sky-300 px-4 py-20 text-slate-800">
      {/* Animated waves background */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600 md:h-12 md:w-12"
      >
        <MoveLeft size={20} />
      </button>

      {/* Header Section */}
      <div className="relative z-10 mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center text-center">
        <h1 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            CREW SUPPORT
          </span>
        </h1>
        <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-blue-600"></div>
        <p className="max-w-2xl text-sm font-normal text-slate-700 md:text-base">
          Need help navigating through{" "}
          <span className="font-bold text-red-600">Ekshunyam 2.0</span>? Our
          crew members are ready to assist you on your journey! Contact any of
          our support pirates below.
        </p>
      </div>

      {/* Support Categories */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* General Support */}
          <div className="rounded-xl border-2 border-red-400 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Phone size={24} />
              </div>
              <h2 className="font-mono text-2xl font-bold text-red-600">
                General Support
              </h2>
            </div>
            <div className="space-y-4">
              {supportTeam
                .filter((member) => member.role === "General Support")
                .map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-red-50 p-4 transition-colors hover:bg-red-100"
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-slate-800">
                        {member.name}
                      </span>
                      <div className="ml-auto rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Navigator
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      href={`tel:${member.phone}`}
                      className="mt-2 flex items-center text-slate-700"
                    >
                      <Phone size={16} className="mr-2" />
                      {member.phone}
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://wa.me/${member.phone.replace(/\s+/g, "")}`}
                      className="mt-2 flex items-center text-green-600 hover:text-green-700"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Registration */}
          <div className="rounded-xl border-2 border-blue-400 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FileText size={24} />
              </div>
              <h2 className="font-mono text-2xl font-bold text-blue-600">
                Registration
              </h2>
            </div>
            <div className="space-y-4">
              {supportTeam
                .filter((member) => member.role === "Registration")
                .map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100"
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-slate-800">
                        {member.name}
                      </span>
                      <div className="ml-auto rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                        Quartermaster
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      href={`tel:${member.phone}`}
                      className="mt-2 flex items-center text-slate-700"
                    >
                      <Phone size={16} className="mr-2" />
                      {member.phone}
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://wa.me/${member.phone.replace(/\s+/g, "")}`}
                      className="mt-2 flex items-center text-green-600 hover:text-green-700"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Technical Support */}
          <div className="rounded-xl border-2 border-yellow-400 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <Cpu size={24} />
              </div>
              <h2 className="font-mono text-2xl font-bold text-yellow-600">
                Technical Support
              </h2>
            </div>
            <div className="space-y-4">
              {supportTeam
                .filter((member) => member.role === "Technical Support")
                .map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-yellow-50 p-4 transition-colors hover:bg-yellow-100"
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-slate-800">
                        {member.name}
                      </span>
                      <div className="ml-auto rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                        Shipwright
                      </div>
                    </div>
                    <Link
                      target="_blank"
                      href={`tel:${member.phone}`}
                      className="mt-2 flex items-center text-slate-700"
                    >
                      <Phone size={16} className="mr-2" />
                      {member.phone}
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://wa.me/${member.phone.replace(/\s+/g, "")}`}
                      className="mt-2 flex items-center text-green-600 hover:text-green-700"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
