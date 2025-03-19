import { Suspense } from "react";

import Wave from "@/components/svg/wave";
import { Toaster } from "sonner";

import RegisterNewTeam from "../_components/profile/register-new-team";
import GroupLinkCard from "../_components/profile/group-link-card";
import dynamic from "next/dynamic";

import TeamDataSkeleton from "../_components/profile/team-data-skeleton";
import ProfileSkeleton from "../_components/profile/profile-skeleton";
import { auth } from "@/server/auth";

const TeamData = dynamic(() => import("../_components/profile/team-data"));
const Profile = dynamic(() => import("../_components/profile/profile"));

export default async function PirateProfilePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-sky-50">
      {/* Animated waves background */}
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Wave />
      </div>

      <Toaster />
      <div className="container relative mx-auto max-w-7xl px-4">
        <h1 className="mb-12 pt-10 text-center text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Profile Card */}
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
          {/* Teams Card */}
          <Suspense fallback={<TeamDataSkeleton />}>
            <TeamData />
          </Suspense>
          {/* Register New Team Card */}
          <RegisterNewTeam />
          <GroupLinkCard
            // userId={profile?.id}
            userId={session?.user.id ?? "def"}
          />          
        </div>
      </div>
    </div>
  );
}
