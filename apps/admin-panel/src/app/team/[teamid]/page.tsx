"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, Phone, User, Users, Briefcase, School } from "lucide-react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function page() {
  const params = useParams<{ teamid: string }>();
  const {
    data: team,
    isError,
    refetch,
  } = api.team.getSingleTeam.useQuery(params?.teamid ?? "");

  const [newTeamName, setNewTeamName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    if (team) {
      setNewTeamName(team.teamNmae || "");
      setIsVerified(team.verfied || false);
    }
  }, [team]);

  if (isError) {
    return <div>Team not found</div>;
  }
  const teamVerificationUpdate = api.team.updateVerifyStatus.useMutation({
    onSuccess: () => {
      toast.success("Verification status updated successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const teamNameUpdate = api.team.updateTeamName.useMutation({
    onSuccess: () => {
      toast.success("Team name updated successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateTeamName = () => {
    teamNameUpdate.mutate({ teamId: params?.teamid, newTeamName });
  };

  const handleUpdateVerificationStatus = () => {
    teamVerificationUpdate.mutate({
      teamId: params?.teamid,
      verifyStatus: isVerified!,
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Toaster />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{team?.teamNmae}</h1>
          <p className="text-gray-600">{team?.user.college}</p>
        </div>
        {team?.verfied ? (
          <Badge className="bg-green-500 px-3 py-1 text-base hover:bg-green-600">
            Verified
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="px-3 py-1 text-base text-gray-500"
          >
            Not Verified
          </Badge>
        )}
      </div>

      {/* Team Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Team Information
            <div className="flex gap-2">
              {/* Team Name Update Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Team Name</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Update Team Name</DialogTitle>
                    <DialogDescription>
                      Enter a new name for the team.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter new team name"
                  />
                  <DialogFooter>
                    <Button onClick={handleUpdateTeamName}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Verification Status Update Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Verification</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Update Verification Status</DialogTitle>
                    <DialogDescription>
                      Toggle the verification status of this team.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2 py-4">
                    <Switch
                      className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-300"
                      id="verification-status"
                      checked={isVerified}
                      onCheckedChange={() => setIsVerified((prev) => !prev)}
                    />
                    <Label htmlFor="verification-status">
                      {isVerified ? "Verified" : "Not Verified"}
                    </Label>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUpdateVerificationStatus}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Team Lead Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>{team?.user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{team?.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{team?.user.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-gray-500" />
                  <span>{team?.user.college}</span>
                </div>
              </CardContent>
            </Card>

            {/* Team Status Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>
                    {team?.fullTeam ? "Full Team" : "Looking for Members"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <span>{team?.events.length} Registered Events</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Registered Events</span>
            <Button
              variant="outline"
              onClick={() => setShowEvents(!showEvents)}
            >
              {showEvents ? "Hide Events" : "View Events"}
            </Button>
          </CardTitle>
          <CardDescription>
            The team has registered for {team?.events.length} event(s)
          </CardDescription>
        </CardHeader>

        {showEvents && (
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {team?.events.map((event, index) => (
                <AccordionItem key={index} value={`event-${index}`}>
                  <AccordionTrigger className="text-left">
                    {event.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md bg-gray-50 p-4">
                      <h4 className="mb-2 font-medium">Participants</h4>
                      <div className="space-y-3">
                        {event.participants &&
                        (typeof event.participants === "string" ||
                          Array.isArray(event.participants)) ? (
                          <Table className="mt-2">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-36">Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="w-12"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {JSON.parse(
                                typeof event.participants === "string"
                                  ? event.participants
                                  : JSON.stringify(event.participants),
                              ).map((participant: any, pIdx: number) => (
                                <TableRow key={pIdx}>
                                  <TableCell className="py-1">
                                    {participant.name}
                                  </TableCell>
                                  <TableCell className="py-1">
                                    {participant.contact}
                                  </TableCell>
                                  <TableCell className="py-1">
                                    <a
                                      href={`tel:${participant.contact}`}
                                      className="text-primary hover:text-primary/80 inline-flex"
                                    >
                                      <Phone className="h-4 w-4" />
                                    </a>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-muted-foreground mt-1 text-sm">
                            No participants information available
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
