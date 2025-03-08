"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type SortOrder = "asc" | "desc";
type VerificationFilter = "verified" | "notVerified" | "all";

export default function TeamsPage() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("all");

  const {
    data: teams,
    isLoading,
    error,
    refetch,
  } = api.team.getAllCollegeTeam.useQuery({
    sortOrder,
    isVerfied: verificationFilter,
  });

  const handleTeamClick = (teamId: string) => {
    router.push(`/team/${teamId}`);
  };
  useEffect(() => {
    void refetch();
  }, []);
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <span className="ml-2">Loading teams...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error loading teams</h2>
        <p className="mt-2 text-gray-700">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">College Teams</h1>
        <p className="mt-2 text-gray-600">
          Browse and filter teams from various colleges
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Verification:</span>
            <Select
              value={verificationFilter}
              onValueChange={(value) =>
                setVerificationFilter(value as VerificationFilter)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by verification" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {" "}
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="notVerified">Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort:</span>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="asc">Oldest</SelectItem>
                <SelectItem value="desc">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Team Cards Grid */}
      {teams && teams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="line-clamp-1">
                    {team.teamNmae}
                  </CardTitle>
                  {team.verfied ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      Not Verified
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {team.user?.college ?? "College information not available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Team Lead: {team.user?.name ?? "Unknown"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {team.fullTeam ? "Full team" : "Looking for members"}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleTeamClick(team.id)}
                  className="w-full"
                >
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed p-6 text-center">
          <div>
            <p className="text-lg font-medium">No teams found</p>
            <p className="mt-1 text-sm text-gray-500">
              Try changing your filters or check back later
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
