import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor, Flag, Link2, Ship } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GroupLinkCard({
  userId,
  colStatus,
}: {
  userId: string | undefined;
  colStatus: string;
}) {
  return (
    <Card
      className={`${colStatus} overflow-hidden border-none bg-white/80 shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl`}
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
      <CardContent className="mt-6 flex items-center justify-center">
        <Link href={`/group-links?teamLeaderId=${userId}`} className="w-full">
          <Button
            variant="default"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
          >
            Join Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
