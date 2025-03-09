import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, Users } from "lucide-react";
import Link from "next/link";

export default function GroupLinkCard({
  userId,
}: {
  userId: string | undefined;
}) {
  return (
    <Card
      className={`overflow-hidden border-none bg-white/80 shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl md:col-span-2`}
    >
      <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-900">
                Connect with us
              </CardTitle>
              <CardDescription className="text-blue-600">
                Join our Whatsapp groups and hoist the flag
              </CardDescription>
            </div>
          </div>
          <Link2 className="h-8 w-8 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="mt-3 flex items-center justify-center">
        <Link
          href={`/group-links?teamLeaderId=${userId}`}
          className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
        >
          <Users className="mr-2 h-5 w-5" />
          Join Now
        </Link>
      </CardContent>
    </Card>
  );
}
