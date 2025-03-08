"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Ship, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import TeamDataSkeleton from "./team-data-skeleton";
import { useEffect } from "react";

export default function TeamData() {
  const deleteForm = api.form.deleteForm.useMutation({
    onSuccess: () => {
      toast.success("Crew deleted successfully");
      void refetchTeams();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete crew");
    },
  });
  const {
    data: teamData,
    refetch: refetchTeams,
    isLoading,
    isFetching,
  } = api.form.getAllForm.useQuery();
  const handleDeleteForm = (formId: string) => {
    deleteForm.mutate({ formId });
  };

  if (isLoading || isFetching) return <TeamDataSkeleton />;

  return (
    <Card className="overflow-hidden border-none bg-white/80 shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2">
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
                className="group flex flex-col items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg md:flex-row"
              >
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-semibold text-blue-900">
                    {team.teamNmae}
                  </h3>
                  <p className="text-sm text-blue-600">
                    {team.fullTeam ? "Full Team" : "Individual Events"} •{" "}
                    {team.totalParticipants} members
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs ${
                      team.verfied
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {team.verfied ? "Verfied" : "Not Verfied"}
                  </span>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs ${
                      team.fullTeam
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {team.fullTeam ? "Full Team" : "Individual"}
                  </span>
                </div>
                <div className="mt-4 flex gap-2 md:mt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={team.verfied}
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
                          This action cannot be undone. This will permanently
                          delete your crew.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          disabled={team.verfied}
                          variant="outline"
                          onClick={() => handleDeleteForm(team.id)}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete Crew
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {team.verfied ? (
                    <Button
                      variant="outline"
                      className="cursor-not-allowed border-blue-200 bg-white text-blue-700 opacity-50 hover:bg-blue-50"
                      disabled
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Crew
                    </Button>
                  ) : (
                    <Link href={`/form/update?id=${team.id}`}>
                      <Button
                        variant="outline"
                        className="border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Crew
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
