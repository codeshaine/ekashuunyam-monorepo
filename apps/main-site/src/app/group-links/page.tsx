import Wave from "@/components/svg/wave";
import { Suspense } from "react";
import { GroupsSkeleton } from "../_components/group-link/GroupSkeleton";
import dynamic from "next/dynamic";

const GroupContent = dynamic(
  () => import("../_components/group-link/GroupContent"),
);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    teamLeaderId: string;
  }>;
}) {
  const teamLeaderId = (await searchParams).teamLeaderId;

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Wave />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="p mx-auto max-w-4xl">
          <Suspense fallback={<GroupsSkeleton />}>
            <GroupContent teamLeaderId={teamLeaderId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
