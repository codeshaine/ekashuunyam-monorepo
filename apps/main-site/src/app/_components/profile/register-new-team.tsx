"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor, Users } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { api } from "@/trpc/react";
export default function RegisterNewTeam() {
  const { data: userStatus } = api.user.isUserInfoComplete.useQuery();

  return (
    <Card
      className={`overflow-hidden border-none bg-white/80 shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2`}
    >
      <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-900">
              Form New Crew
            </CardTitle>
            <CardDescription className="text-blue-600">
              Set sail for your next adventure
            </CardDescription>
          </div>
          <Anchor className="h-8 w-8 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="mt-3">
        {userStatus?.isComplete ? (
          <Link
            href="/form/register"
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
          >
            <Users className="mr-2 h-5 w-5" />
            Register New Crew
          </Link>
        ) : (
          <Button
            onClick={() => toast.error("please add college and contact number")}
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
          >
            <Users className="mr-2 h-5 w-5" />
            Register New Crew
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
