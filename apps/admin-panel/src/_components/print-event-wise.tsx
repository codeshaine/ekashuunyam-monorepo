import { Button } from "@/components/ui/button";
import type { JsonValue } from "@prisma/client/runtime/library";
import { Printer } from "lucide-react";
import { toast, Toaster } from "sonner";

interface Participant {
  name: string;
  contact: string;
}

interface Event {
  name: string;
  participants: string | Participant[] | JsonValue;
  formId: string;
}

interface TeamUser {
  name: string | null;
  email: string | null;
  college: string | null;
  contact: string | null;
}

interface TeamData {
  user: TeamUser;
  teamNmae: string | null;
  verfied: boolean;
  fullTeam: boolean;
  events: Event[];
}

interface PrintEventWiseProps {
  data: TeamData[];
  eventName: string;
}

export function PrintEventWise({ data, eventName }: PrintEventWiseProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      try {
        const safeParseParticipants = (participants: any): Participant[] => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return typeof participants === "string"
              ? JSON.parse(participants)
              : participants;
          } catch (error) {
            console.error("Failed to parse participants", error);
            return [];
          }
        };

        printWindow.document.write(`
          <html>
            <head>
              <title>Team Registration Details</title>
              <style>
                * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                  line-height: 1.4;
                  max-width: 700px;
                  margin: 0 auto;
                  padding: 10px;
                  font-size: 12px;
                  color: #333;
                }
                .header {
                  text-align: center;
                  border-bottom: 1px solid #007bff;
                  padding: 10px 0;
                  margin-bottom: 15px;
                }
                .header h1 {
                  font-size: 16px;
                  margin-bottom: 5px;
                }
                .team-card {
                  background-color: #f4f4f4;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  padding: 10px;
                  margin-bottom: 10px;
                }
                .team-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 5px;
                  margin-bottom: 5px;
                }
                .team-name {
                  font-weight: bold;
                  color: #007bff;
                  font-size: 14px;
                }
                .team-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 5px;
                  margin-bottom: 10px;
                  font-size: 11px;
                }
                .participants-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 5px;
                  font-size: 10px;
                }
                .participants-table th, 
                .participants-table td {
                  border: 1px solid #ddd;
                  padding: 4px;
                  text-align: left;
                }
                .participants-table thead {
                  background-color: #f1f1f1;
                }
                @media print {
                  body {
                    max-width: none;
                    padding: 0;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Team Registration Details of ${eventName}</h1>
                <p>Total Teams: ${data.length}</p>
              </div>

              ${data
                .map(
                  (team) => `
                <div class="team-card">
                  <div class="team-header">
                    <div class="team-name">${team.teamNmae ?? "Unnamed Team"}</div>
                    <div>${team.verfied ? "✓ Verified" : "✗ Unverified"}</div>
                  </div>
                  
                  <div class="team-info">
                    <div><strong>College:</strong> ${team.user.college ?? "N/A"}</div>
                    <div><strong>Team Lead:</strong> ${team.user.name ?? "N/A"}</div>
                    <div><strong>Contact:</strong> ${team.user.contact ?? "N/A"}</div>
                    <div><strong>Team Type:</strong> ${team.fullTeam ? "Full Team" : "Partial Team"}</div>
                  </div>

                  ${
                    team.events && team.events.length > 0
                      ? team.events
                          .map(
                            (event) => `
                    <div>
                      <strong>Event: ${event.name}</strong>
                      ${
                        event.participants &&
                        Array.isArray(event.participants) &&
                        event.participants.length > 0
                          ? `
                        <table class="participants-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${safeParseParticipants(event.participants)
                              .map(
                                (participant) => `
                              <tr>
                                <td>${participant.name || "N/A"}</td>
                                <td>${participant.contact || "N/A"}</td>
                              </tr>
                            `,
                              )
                              .join("")}
                          </tbody>
                        </table>
                      `
                          : "<p>No participants</p>"
                      }
                    </div>
                  `,
                          )
                          .join("")
                      : "<p>No events registered</p>"
                  }
                </div>
              `,
                )
                .join("")}
            </body>
          </html>
        `);

        printWindow.document.close();

        printWindow.onload = function () {
          printWindow.print();
        };
      } catch (error) {
        console.error("Print preview generation error:", error);
        toast.error("Failed to generate print preview. Please try again.");
      }
    } else {
      toast.error(
        "Unable to open print preview. Please check your popup blocker settings.",
      );
    }
  };

  return (
    <>
      <Toaster />
      <Button
        onClick={handlePrint}
        variant="outline"
        className="mb-8 flex items-center gap-2"
        aria-label="Print Teams"
      >
        <Printer className="h-4 w-4" />
        Print Teams
      </Button>
    </>
  );
}
