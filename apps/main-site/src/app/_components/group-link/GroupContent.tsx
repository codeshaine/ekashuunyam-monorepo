import { ShareSkeleton } from "../group-link/ShareSkeleton";
import { groupData } from "@/lib/whastapp-group-links";
import { GroupLink } from "../group-link/GroupLink";
import { api } from "@/trpc/server";
import { GroupError } from "../group-link/GroupError";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ShareButton = dynamic(() => import("../group-link/ShareButton"));

export default async function GroupContent({
  teamLeaderId,
}: {
  teamLeaderId: string;
}) {
  const { isEligible } = await api.user.isUserEligibleForViewingGroupLink({
    teamLeaderId: teamLeaderId ?? "default",
  });

  if (!isEligible || !teamLeaderId) {
    return <GroupError />;
  }

  return (
    <>
      <div className="flex w-full justify-between gap-4 p-4">
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-center text-4xl font-extrabold text-transparent">
          Connect
        </h1>
        <Suspense fallback={<ShareSkeleton />}>
          <ShareButton />
        </Suspense>
      </div>
      <p className="mx-auto max-w-2xl text-center text-gray-600">
        Set sail and join your crew! Connect with event organizers and stay
        updated on the latest adventures.
      </p>
      <p className="mx-auto mb-10 max-w-2xl text-center text-red-600">
        <strong>
          *Note: Share this link with your team mates to join the groups.
        </strong>
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {groupData.map((group, index) => (
          <GroupLink
            key={index}
            name={group.name}
            subname={group.subname}
            whatsappLink={group.whatsappLink}
          />
        ))}
      </div>
    </>
  );
}
