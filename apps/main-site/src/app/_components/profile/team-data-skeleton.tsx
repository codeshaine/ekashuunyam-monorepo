import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Ship } from "lucide-react";

export default function TeamDataSkeleton() {
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
        <div className="max-h-[400px] space-y-4 overflow-y-auto">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg md:flex-row"
            >
              <div className="space-y-1 text-center md:text-left">
                <Skeleton className="h-5 w-32 bg-blue-200" />
                <Skeleton className="h-4 w-48 bg-blue-100" />
                <Skeleton className="h-5 w-20 rounded-full bg-blue-300" />
              </div>
              <div className="mt-4 flex gap-2 md:mt-0">
                <Skeleton className="h-10 w-24 bg-red-200" />
                <Skeleton className="h-10 w-24 bg-blue-200" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
