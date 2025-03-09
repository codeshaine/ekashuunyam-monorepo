import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UpdateFormSkeleton() {
  // Array of event types to create skeletons for
  const events = [
    "Quiz Event",
    "Surprise Event",
    "Mini Hackathon",
    "Gaming Event",
    "Coding Event",
    "Group Dance",
    "Reels Event",
    "IT Manager",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50">
      <div className="absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <path
            d="M0 737L45.7 735.8C91.3 734.7 182.7 732.3 274.2 715.3C365.7 698.3 457.3 666.7 548.8 652.5C640.3 638.3 731.7 641.7 823 652.5C914.3 663.3 1005.7 681.7 1097 688.3C1188.3 695 1279.7 690 1371.2 692.7C1462.7 695.3 1554.3 705.7 1645.8 703C1737.3 700.3 1828.7 684.7 1874.3 676.8L1920 669L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#60bff5"
          />
        </svg>
      </div>

      <div className="px-4 sm:px-8 lg:px-32 relative w-screen flex-col mx-auto py-12">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-3/4 max-w-2xl rounded-lg" />
          <Skeleton className="mx-auto h-6 w-2/4 rounded-lg" />
        </div>

        <div className="space-y-8">
          {events.map((eventName, eventIndex) => (
            <Card key={eventIndex} className="border border-blue-100 bg-white">
              <CardHeader className="border-b border-blue-50 bg-blue-50">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  {eventName === "Group Dance" && (
                    <Skeleton className="h-10 w-32 rounded-2xl" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Create 2 member cards per event by default, 
                      except for Group Dance which can have more */}
                  {Array.from({
                    length: eventName === "Group Dance" ? 4 : 2,
                  }).map((_, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="member-card rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-lg"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-5 w-24 rounded-lg" />
                        </div>
                        {eventName === "Group Dance" && (
                          <Skeleton className="h-9 w-24 rounded-xl" />
                        )}
                      </div>

                      <div className="mb-6 space-y-2">
                        <Skeleton className="h-5 w-24 rounded-lg" />
                        <Skeleton className="h-11 w-full rounded-2xl" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 rounded-lg" />
                        <Skeleton className="h-11 w-full rounded-2xl" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center gap-6">
            <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
