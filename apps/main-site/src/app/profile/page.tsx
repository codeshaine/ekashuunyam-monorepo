"use client";
import React, { useState } from "react";
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
import { User, GraduationCap, Mail } from "lucide-react";
import Image from "next/image";
import { api } from "@/trpc/react";
import { type TRPCClientErrorLike } from "@trpc/client";
import { colleges } from "@/lib/data";

export default function BentoProfilePage() {
  const { data: profile, isLoading, refetch } = api.user.userDetails.useQuery();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
  });

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
    return <div>Please sign in to view your profile</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <Toaster />
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="mb-8 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
          Profile Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Profile Overview Card */}
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
            <CardHeader className="border-b border-indigo-100 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
              <div className="flex items-center space-x-4">
                {profile.image ? (
                  <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-indigo-200 transition-all duration-300 hover:ring-indigo-300">
                    <Image
                      src={profile.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 ring-4 ring-indigo-200">
                    <User className="h-12 w-12 text-indigo-600" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-2xl font-bold text-indigo-900">
                    {profile.name}
                  </CardTitle>
                  <CardDescription className="text-indigo-600">
                    Student Profile
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <div className="group rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
              </div>
              <div className="group rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-700">{profile.college}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Card */}
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
            <CardHeader className="border-b border-amber-100 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <CardTitle className="text-2xl font-bold text-amber-800">
                Edit Profile
              </CardTitle>
              <CardDescription className="text-amber-600">
                Update your information
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              {!isEditingProfile ? (
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
                >
                  Edit Profile
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-800">
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
                      className="border-amber-200 bg-white/70 transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-800">
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
                      <SelectTrigger className="border-amber-200 bg-white/70 transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((collegeOption) => (
                          <SelectItem
                            key={collegeOption}
                            value={collegeOption}
                            className="hover:bg-amber-50"
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
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
