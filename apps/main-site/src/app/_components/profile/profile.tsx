"use client";
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
import { GraduationCap, Mail, Edit, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import ProfileSkeleton from "./profile-skeleton";

export default function Profile() {
  const {
    data: profile,
    isLoading,
    refetch,
    isFetching,
  } = api.user.userDetails.useQuery();
  const { data: userStatus, refetch: userStatusRefetch } =
    api.user.isUserInfoComplete.useQuery();

  const updateProfile = api.user.updateUserDetails.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message ?? "profile updated successfully");
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      await userStatusRefetch();
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to update profile");
      setIsSubmitting(false);
    },
  });

  const [profilePic, setProfilePic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    contact: "",
  });
  const [contactError, setContactError] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setProfilePic(() =>
      pfp && pfp.length > 0
        ? (pfp[Math.floor(Math.random() * pfp.length)]?.src ??
          "/pfp/luffy.jpeg")
        : "/pfp/luffy.jpeg",
    );
  }, []);

  useEffect(() => {
    if (userStatus && !userStatus.isComplete) {
      setIsEditDialogOpen(true);
    }
  }, [userStatus]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? "",
        college: profile.college ?? "",
        contact: profile.contact ?? "",
      });
    }
  }, [profile]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, contact: value });

    // Clear error when field is empty or when user is typing
    if (!value.trim() || validatePhoneNumber(value)) {
      setContactError("");
    }
  };
  const validatePhoneNumber = (phoneNumber: string) => {
    // Skip validation if empty (assuming it's optional)
    if (!phoneNumber.trim()) return true;

    // Pattern for 10-digit Indian phone number (optionally with +91 prefix)
    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.college ||
      !formData.contact.trim()
    ) {
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
  if (isLoading || isFetching) return <ProfileSkeleton />;

  return (
    <Card className="overflow-hidden border-none bg-white/80 shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
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
            <CardDescription className="text-blue-600">Captain</CardDescription>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
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
                      *Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Name"
                      className="border-blue-200 bg-white/90 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact"
                      className="text-sm font-medium text-blue-900"
                    >
                      *Phone Number
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
                        <p className="text-xs text-red-500">{contactError}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Format: 10-digit mobile number (e.g., 9876543210 or +91
                        9876543210)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="college"
                      className="text-sm font-medium text-blue-900"
                    >
                      *College
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
      <CardContent className="mt-4 space-y-4 text-sm">
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
              {profile?.contact ??
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
              {profile?.college ??
                "Click 'Edit Profile' to choose your college"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
