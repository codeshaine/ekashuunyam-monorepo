import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Network } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GroupError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="pb-0">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-50 p-4">
              <Lock className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            <AlertTriangle className="mr-2 h-8 w-8 text-yellow-500" />
            <p className="max-w-xs text-gray-600">
              You or your team leader may not have registered a team, so you
              don’t have access to view this page. or else link may be broken.
              Please contact your team leader for page link.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/" className="block">
              <Button
                variant="ghost"
                className="w-full text-blue-600 hover:bg-blue-100"
              >
                <Network className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>

          <div className="text-xs italic text-gray-500">
            Error Code: ACCESS_DENIED
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
