"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import {
  User,
  GraduationCap,
  Mail,
  Users,
  Edit,
  Ship,
  Anchor,
} from "lucide-react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { colleges } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BentoProfilePage() {
  const { data: profile, isLoading, refetch } = api.user.userDetails.useQuery();
  const headerRef = useRef(null);
  const waveRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
  });

  // Mock data for registered teams
  const mockTeams = [
    {
      id: 1,
      name: "Sea Raiders",
      members: 4,
      event: "Treasure Hunt",
      status: "Pending",
    },
    {
      id: 2,
      name: "Wave Riders",
      members: 3,
      event: "Ship Battle",
      status: "Confirmed",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wave animation
      gsap.to(waveRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Header animation with pirate theme
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        rotation: -5,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 0.6,
            delay: index * 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  // Initialize form data when profile loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        college: profile.college ?? "",
      });
    }
  }, [profile]);

  const updateProfile = api.user.updateUserDetails.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
      setIsEditingProfile(false);
      await refetch();
    },
    onError: (error: TRPCClientErrorLike<any>) => {
      toast.error(error.message ?? "Failed to update profile");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.college) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    updateProfile.mutate({
      name: formData.name,
      college: formData.college,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-2xl">Please sign in to join the crew!</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-12">
      <div ref={waveRef} className="fixed bottom-0 left-0 right-0 z-0">
        <svg className="h-32 w-full" viewBox="0 0 1440 120">
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="#2E63A4"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      <Toaster />
      <div className="container relative mx-auto max-w-7xl px-4">
        <h1
          ref={headerRef}
          className="mb-12 text-center text-5xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Pirate's Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Profile Overview Card */}
          <Card
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center space-x-4">
                {profile.image ? (
                  <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-200 transition-all duration-300 hover:ring-blue-300">
                    <Image
                      src={profile.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 ring-4 ring-blue-200">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {profile.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Crew Member
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <div className="group rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
              </div>
              <div className="group rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700">{profile.college}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Card */}
          <Card
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <CardTitle className="text-2xl font-bold text-blue-900">
                Edit Profile
              </CardTitle>
              <CardDescription className="text-blue-600">
                Update your information
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              {!isEditingProfile ? (
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-600"
                >
                  Edit Profile
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">
                      Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      placeholder="Enter your name"
                      className="border-blue-200 bg-white/70 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-800">
                      College
                    </label>
                    <Select
                      value={formData.college}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          college: value,
                        }));
                      }}
                    >
                      <SelectTrigger className="border-blue-200 bg-white/70 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((collegeOption) => (
                          <SelectItem
                            key={collegeOption}
                            value={collegeOption}
                            className="hover:bg-blue-50"
                          >
                            {collegeOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-600"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Register Team Card */}
          <Card
            ref={(el) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-4"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    Register New Team
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Assemble your crew for the next adventure
                  </CardDescription>
                </div>
                <Ship className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <Link
                href="/register"
                className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-600"
              >
                <Users className="mr-2 h-5 w-5" />
                Register New Team
              </Link>
            </CardContent>
          </Card>

          {/* Registered Teams Card */}
          <Card
            ref={(el) => {
              if (el) cardsRef.current[3] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-4"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    Your Teams
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Manage your registered teams
                  </CardDescription>
                </div>
                <Anchor className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="space-y-4">
                {mockTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold text-blue-900">
                        {team.name}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {team.event} • {team.members} members
                      </p>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs ${
                          team.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {team.status}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Team
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
