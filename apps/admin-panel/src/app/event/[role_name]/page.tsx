"use client";

import { EventRole, Role, RoleToEvent } from "@/lib/members";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Users,
  School,
  CalendarDays,
  CheckCircle,
  XCircle,
  Info,
  X,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export default function Page() {
  const params = useParams<{ role_name: EventRole }>();
  const [openTeamInfo, setOpenTeamInfo] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isError, error } = api.team.getAllTeamOfEvent.useQuery({
    sortOrder,
    eventName: RoleToEvent[params.role_name],
  });
  const eventRoleValues = Object.values(Role).filter(
    (role) => ![Role.SUPER_ADMIN, Role.REGISTRATION, Role.ERROR].includes(role),
  ) as [string, ...string[]];
  const EventRoleSchema = z.enum(eventRoleValues);
  const result = EventRoleSchema.safeParse(params.role_name);

  if (!result.success) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground text-center text-lg">
          Invalid Event Name: {params.role_name}
        </p>
      </div>
    );
  }

  // Toggle function
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground text-center text-lg">
          Error loading team data: {error.message}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground text-center text-lg">
          No team data available
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={toggleSortOrder} variant="outline" className="mb-4">
        Sort: {sortOrder === "asc" ? "oldest" : "Newest"}
      </Button>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.role_name ? `${params.role_name} Teams` : "All Teams"}
        </h1>
        <p className="text-muted-foreground">
          Viewing teams and their event participations
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((team, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <CardTitle className="text-xl">{team.teamNmae}</CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <School className="mr-1 h-4 w-4" />
                      {team.user.college || "No college specified"}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={team.verfied ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {team.verfied ? (
                    <>
                      <CheckCircle className="h-4 w-4" /> Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" /> Unverified
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Team Information
                  </h3>
                  <div className="space-y-2">
                    {team.fullTeam ? (
                      <div className="flex items-center text-sm">
                        <Users className="text-muted-foreground mr-2 h-4 w-4" />
                        <span>Full Team</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-sm">
                        <User className="text-muted-foreground mr-2 h-4 w-4" />
                        <span>Partial Team</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Team Lead: {team.user.name}
                      </span>
                      <Dialog
                        open={openTeamInfo === team.user.email}
                        onOpenChange={(open) =>
                          setOpenTeamInfo(open ? team.user.email : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <button className="text-primary hover:text-primary/80 flex items-center text-sm">
                            <Info className="mr-1 h-4 w-4" /> Details
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Team Lead Information</DialogTitle>
                            <DialogDescription>
                              Contact details for {team.user.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <Mail className="text-muted-foreground mr-2 h-5 w-5" />
                                <span>{team.user.email}</span>
                              </div>
                              <a
                                href={`mailto:${team.user.email}`}
                                className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full p-2"
                              >
                                <Mail className="h-5 w-5" />
                              </a>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <Phone className="text-muted-foreground mr-2 h-5 w-5" />
                                <span>{team.user.contact}</span>
                              </div>
                              <a
                                href={`tel:${team.user.contact}`}
                                className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full p-2"
                              >
                                <Phone className="h-5 w-5" />
                              </a>
                            </div>
                          </div>
                          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Participants
                    </div>
                  </h3>

                  {team.events && team.events.length > 0 ? (
                    <ScrollArea className="h-48">
                      {team.events.map((event, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/40 mb-4 rounded-md p-3"
                        >
                          {event.participants &&
                          Array.isArray(event.participants) &&
                          event.participants.length > 0 ? (
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
                      ))}
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No events registered
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
