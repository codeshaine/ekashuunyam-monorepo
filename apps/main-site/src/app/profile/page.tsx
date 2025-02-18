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
  Anchor,
  Ship,
  X,
} from "lucide-react";
import Image from "next/image";
import { api } from "@/trpc/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { colleges } from "@/lib/data";
gsap.registerPlugin(ScrollTrigger);

export default function PirateProfilePage() {
  const { data: profile, isLoading, refetch } = api.user.userDetails.useQuery();
  const headerRef = useRef(null);
  const wavesRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
  });

  const { data: teamData, refetch: refetchTeams } =
    api.form.getAllForm.useQuery();

  const deleteForm = api.form.deleteForm.useMutation({
    onSuccess: () => {
      toast.success("Crew deleted successfully");
      void refetchTeams();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete crew");
    },
  });

  const handleDeleteForm = (formId: string) => {
    deleteForm.mutate({ formId });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Waves animation
      gsap.to(wavesRef.current, {
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

      // Cards animation with wave-like motion
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? 3 : -3,
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

    return () => ctx.revert();
  }, []);

  useEffect(() => {
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
    onError: (error) => {
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50">
        <div className="text-2xl text-blue-900">
          Loading your crew details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Animated waves background */}
      <div ref={wavesRef} className="fixed bottom-0 left-0 right-0 z-0">
        <svg
          className="h-64 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#60bff5"
            fillOpacity="0.4"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,117.3C672,85,768,75,864,101.3C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#50a7e2"
            fillOpacity="0.6"
            d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,181.3C672,192,768,192,864,181.3C960,171,1056,149,1152,160C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#2e63a4"
            fillOpacity="0.8"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
            Nakama Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Profile Card */}
          <Card
            ref={(el: HTMLDivElement | null) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-200 transition-all duration-300 hover:ring-blue-300">
                  {profile?.image ? (
                    <Image
                      src={profile?.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  {isEditingProfile ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Name"
                        className="border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400"
                        required
                      />
                      <Select
                        value={formData.college}
                        onValueChange={(value) =>
                          setFormData({ ...formData, college: value })
                        }
                      >
                        <SelectTrigger className="w-full border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400">
                          <SelectValue placeholder="Select your college" />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges.map((college) => (
                            <SelectItem
                              key={college}
                              value={college}
                              className="focus:bg-blue-50"
                            >
                              {college}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditingProfile(false)}
                          className="border-blue-200 hover:bg-blue-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <CardTitle className="text-2xl font-bold text-blue-900">
                        {profile?.name}
                      </CardTitle>
                      <CardDescription className="text-blue-600">
                        Captain
                      </CardDescription>
                      <Button
                        onClick={() => setIsEditingProfile(true)}
                        variant="outline"
                        className="mt-2 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <div className="group rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700">{profile?.email}</span>
                </div>
              </div>
              <div className="group rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <span
                    className={`text-gray-700 ${!profile?.college ? "font-semibold text-red-500" : ""}`}
                  >
                    {profile?.college ||
                      "Click 'Edit Profile' to choose your college"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teams Card */}
          <Card
            ref={(el: HTMLDivElement | null) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    Your Crews
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Manage your pirate crews
                  </CardDescription>
                </div>
                <Ship className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto">
                  {teamData?.map((team) => (
                    <div
                      key={team.id}
                      className="group flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold text-blue-900">
                          {team.teamNmae}
                        </h3>
                        <p className="text-sm text-blue-600">
                          {team.fullTeam ? "Full Team" : "Individual Events"} •{" "}
                          {team.totalParticipants} members
                        </p>
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs ${
                            team.fullTeam
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {team.fullTeam ? "Full Team" : "Individual Events"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-red-200 bg-white text-red-700 hover:bg-red-50"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Are you sure?</DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your crew.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => handleDeleteForm(team.id)}
                                className="bg-red-500 text-white hover:bg-red-600"
                              >
                                Delete Crew
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Link href={`/form/update?id=${team.id}`}>
                          <Button
                            variant="outline"
                            className="border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Crew
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Register New Team Card */}
          <Card
            ref={(el: HTMLDivElement | null) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-4"
          >
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    Form New Crew
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Set sail for your next adventure
                  </CardDescription>
                </div>
                <Anchor className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <Link
                href="/form/register"
                className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
              >
                <Users className="mr-2 h-5 w-5" />
                Assemble New Crew
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
