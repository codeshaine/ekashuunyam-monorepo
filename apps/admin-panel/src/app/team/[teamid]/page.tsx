"use client";

import { useEffect, useState, useRef } from "react";
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
import {
  Mail,
  Phone,
  User,
  Users,
  Briefcase,
  School,
  Printer,
} from "lucide-react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/app/action";
import type { Session } from "next-auth";
import { Role } from "@/lib/members";

export default function Page() {
  const params = useParams<{ teamid: string }>();
  const {
    data: team,
    isError,
    refetch,
  } = api.team.getSingleTeam.useQuery(params?.teamid ?? "");

  const [newTeamName, setNewTeamName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [userSession, setUserSession] = useState<Session | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const user = await getUserSession();
        setUserSession(user);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      }
    })();
  }, []);

  const printRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (team) {
      setNewTeamName(team.teamNmae ?? "");
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

  const teamDelete = api.team.deleteTeam.useMutation({
    onSuccess: () => {
      toast.success("Team deleted successfully");
      router.push("/");
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
      verifyStatus: isVerified,
    });
  };

  const handleDeleteTeam = () => {
    teamDelete.mutate(params?.teamid);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Team Details - ${team?.teamNmae}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 15px;
                max-width: 210mm; /* A4 width */
                margin: 0 auto;
                color: #333;
                font-size: 11px;
              }
              .header {
                text-align: center;
                margin-bottom: 8px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ddd;
              }
              .header h1 {
                font-size: 18px;
                margin: 0 0 5px 0;
              }
              .header p {
                margin: 0 0 3px 0;
                font-size: 12px;
              }
              .team-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding: 5px;
                background-color: #f9f9f9;
                border-radius: 3px;
              }
              .events-section {
                margin-bottom: 10px;
              }
              .events-title {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 5px;
              }
              .events-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
              }
              .event {
                padding: 5px;
                border: 1px solid #eee;
                border-radius: 3px;
              }
              .event-title {
                font-weight: bold;
                margin-bottom: 3px;
                font-size: 13px;
                border-bottom: 1px solid #eee;
                padding-bottom: 3px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
              }
              th, td {
                padding: 3px;
                text-align: left;
                border-bottom: 1px solid #eee;
              }
              th {
                background-color: #f5f5f5;
                font-weight: bold;
              }
              @media print {
                body {
                  print-color-adjust: exact;
                  -webkit-print-color-adjust: exact;
                }
                .event {
                  break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${team?.teamNmae ?? "Team Details"}</h1>
              <p>${team?.user.college ?? ""} ${team?.verfied ? "✓ Verified" : ""}</p>
            </div>
            
            <div class="team-info">
              <div><strong>Team Lead:</strong> ${team?.user.name ?? ""}</div>
              <div><strong>Contact:</strong> ${team?.user.contact ?? ""}</div>
            </div>
            
            <div class="events-section">
              <div class="events-title">Registered Events (${team?.events.length ?? 0})</div>
              <div class="events-grid">
                ${
                  team?.events
                    .map((event, index) => {
                      let participantsHtml = "";
                      if (event.participants) {
                        try {
                          //eslint-disable-next-line
                          const participants =
                            typeof event.participants === "string"
                              ? JSON.parse(event.participants)
                              : event.participants;

                          participantsHtml = `
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                            ${
                              Array.isArray(participants)
                                ? participants
                                    .map(
                                      (p: {
                                        name: string;
                                        contact: string;
                                      }) => `
                                  <tr>
                                  <td>${p.name ?? ""}</td>
                                <td>${p.contact ?? ""}</td>
                              </tr>
                            `,
                                    )
                                    .join("")
                                : ""
                            }
                          </tbody>
                        </table>
                      `;
                        } catch (e) {
                          console.log(e);
                          participantsHtml = "<p>No participants data</p>";
                        }
                      } else {
                        participantsHtml = "<p>No participants</p>";
                      }

                      return `
                    <div class="event">
                      <div class="event-title">${event.name || `Event ${index + 1}`}</div>
                      ${participantsHtml}
                    </div>
                  `;
                    })
                    .join("") ?? "<p>No events registered</p>"
                }
              </div>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = function () {
        printWindow.print();
      };
    } else {
      toast.error(
        "Unable to open print preview. Please check your popup blocker settings.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Toaster />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{team?.teamNmae}</h1>
          <p className="text-gray-600">{team?.user.college}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Team delete */}
          {userSession?.user.role === Role.SUPER_ADMIN && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Delete Team</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Delete Team</DialogTitle>
                  <DialogDescription>
                    <p>are you sure you want to delete?</p>
                    <p>(only super admin can do this operation)</p>
                  </DialogDescription>
                </DialogHeader>

                <Button
                  className="bg-red-600 text-white"
                  onClick={handleDeleteTeam}
                >
                  DELETE TEAM
                </Button>
              </DialogContent>
            </Dialog>
          )}

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
          <Button
            onClick={handlePrint}
            className="ml-4 flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
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
                              {
                                //eslint-disable-next-line
                                JSON.parse(
                                  typeof event.participants === "string"
                                    ? event.participants
                                    : JSON.stringify(event.participants),

                                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                ).map(
                                  (
                                    participant: {
                                      name: string;
                                      contact: string;
                                    },
                                    pIdx: number,
                                  ) => (
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
                                  ),
                                )
                              }
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

      {/* Hidden printable div */}
      <div id="printableArea" ref={printRef} className="hidden"></div>
    </div>
  );
}
