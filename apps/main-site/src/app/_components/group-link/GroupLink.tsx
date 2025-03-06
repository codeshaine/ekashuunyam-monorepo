"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, NetworkIcon } from "lucide-react";

export function GroupLink({
  name,
  subname,
  whatsappLink,
}: {
  name: string;
  subname: string;
  whatsappLink: string;
}) {
  return (
    <Card className="w-full transform truncate transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg font-bold md:text-xl">
            {name}
          </CardTitle>
          <NetworkIcon className="ml-2 h-4 w-4 flex-shrink-0 text-gray-400 md:h-5 md:w-5" />
        </div>
        <CardDescription className="line-clamp-2 text-sm italic text-gray-600 md:text-base">
          {subname}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="w-full truncate text-xs text-gray-500 md:text-sm">
            {whatsappLink}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="flex w-full flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap border-blue-500 text-blue-600 transition-colors hover:border-blue-600 hover:bg-blue-50 sm:w-auto"
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Join Now</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
