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
import Wave from "@/components/svg/wave";
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
  Phone,
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
import { colleges, pfp } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function PirateProfilePage() {
  const { data: profile, isLoading, refetch } = api.user.userDetails.useQuery();
  // const searchParams = useSearchParams();
  // const [autoEdit, setAutoEdit] = useState("");
  // const editProfileRef = useRef<HTMLButtonElement | null>(null);

  const [profilePic, setProfilePic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    contact: "",
  });
  const [contactError, setContactError] = useState("");

  const { data: teamData, refetch: refetchTeams } =
    api.form.getAllForm.useQuery();
  const { data: userStatus, refetch: userStatusRefetch } =
    api.user.isUserInfoComplete.useQuery();

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
    setProfilePic(() =>
      pfp && pfp.length > 0
        ? (pfp[Math.floor(Math.random() * pfp.length)]?.src ??
          "/pfp/luffy.jpeg")
        : "/pfp/luffy.jpeg",
    );
  }, []);

  // useEffect(() => {
  //   setAutoEdit(() => searchParams.get("auto") ?? "");
  // }, [searchParams]);

  // useEffect(() => {
  //   if (autoEdit == "true" && editProfileRef.current != null) {
  //     console.log("Clicked");
  //     editProfileRef.current?.click();
  //   }
  // }, [autoEdit]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        college: profile.college ?? "",
        contact: profile.contact ?? "",
      });
    }
  }, [profile]);

  useEffect(() => {
    void refetchTeams();
  }, []);

  const updateProfile = api.user.updateUserDetails.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
      await userStatusRefetch();
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to update profile");
      setIsSubmitting(false);
    },
  });

  // Validate phone number format
  const validatePhoneNumber = (phoneNumber: string) => {
    // Skip validation if empty (assuming it's optional)
    if (!phoneNumber.trim()) return true;

    // Pattern for 10-digit Indian phone number (optionally with +91 prefix)
    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, contact: value });

    // Clear error when field is empty or when user is typing
    if (!value.trim() || validatePhoneNumber(value)) {
      setContactError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.college) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone number if provided
    if (formData.contact && !validatePhoneNumber(formData.contact)) {
      setContactError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    updateProfile.mutate({
      name: formData.name,
      college: formData.college,
      contact: formData.contact,
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
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Wave />
      </div>

      <Toaster />
      <div className="container relative mx-auto max-w-7xl px-4">
        <h1 className="mb-12 pt-10 text-center text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Profile Card */}
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
            <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-200 transition-all duration-300 hover:ring-blue-300">
                  <Image
                    src={profilePic || "/public/luffy.jpeg"}
                    alt="Profile"
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {profile?.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Captain
                  </CardDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        // ref={editProfileRef}
                        variant="outline"
                        className="mt-2 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-blue-900">
                          Edit Profile
                        </DialogTitle>
                        <DialogDescription className="text-blue-600">
                          Update your pirate information below
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-blue-900"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Name"
                            className="border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="contact"
                            className="text-sm font-medium text-blue-900"
                          >
                            Phone Number
                          </label>
                          <div className="space-y-1">
                            <Input
                              id="contact"
                              type="tel"
                              value={formData.contact}
                              onChange={handleContactChange}
                              placeholder="Phone Number (e.g., 9876543210)"
                              className={`border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400 ${
                                contactError ? "border-red-500" : ""
                              }`}
                            />
                            {contactError && (
                              <p className="text-xs text-red-500">
                                {contactError}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">
                              Format: 10-digit mobile number (e.g., 9876543210
                              or +91 9876543210)
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="college"
                            className="text-sm font-medium text-blue-900"
                          >
                            College
                          </label>
                          <Select
                            value={formData.college}
                            onValueChange={(value) =>
                              setFormData({ ...formData, college: value })
                            }
                          >
                            <SelectTrigger
                              id="college"
                              className="w-full border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400"
                            >
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
                        </div>
                        <DialogFooter className="pt-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                          >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                  <Phone className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                  <span
                    className={`text-gray-700 ${!profile?.contact ? "font-semibold text-red-500" : ""}`}
                  >
                    {profile?.contact ||
                      "Click 'Edit Profile' to add your phone number"}
                  </span>
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
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
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
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-4">
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
              {userStatus && userStatus.isComplete ? (
                <Link
                  href="/form/register"
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Assemble New Crew
                </Link>
              ) : (
                <Button
                  onClick={() =>
                    toast.error("please add college and contact number")
                  }
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Assemble New Crew
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
