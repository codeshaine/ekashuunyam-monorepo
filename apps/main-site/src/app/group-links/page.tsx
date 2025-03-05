import { groupData } from "@/lib/whastapp-group-links";
import { GroupLink } from "../_components/group-link/GroupLink";
import { api } from "@/trpc/server";
import { GroupError } from "../_components/group-link/GroupError";
import Wave from "@/components/svg/wave";
import { ShareButton } from "../_components/group-link/ShareButton";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    teamLeaderId: string;
  };
}) {
  //get param from url
  const teamLeaderId = (await searchParams).teamLeaderId;
  const { isEligible } = await api.user.isUserEligibleForViewingGroupLink({
    teamLeaderId: teamLeaderId ?? "default",
  });
  if (!isEligible || !teamLeaderId) {
    return <GroupError />;
  }
  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle wave background */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Wave />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="p mx-auto max-w-4xl">
          <div className="flex w-full justify-between gap-4 p-4">
            <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-center text-4xl font-extrabold text-transparent">
              Connect
            </h1>
            <ShareButton />
          </div>
          <p className="mx-auto max-w-2xl text-center text-gray-600">
            Set sail and join your crew! Connect with event organizers and stay
            updated on the latest adventures.
          </p>{" "}
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
        </div>
      </div>
    </div>
  );
}
