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
    <Card className="w-full transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <NetworkIcon className="h-5 w-5 text-gray-400" />
        </div>
        <CardDescription className="italic text-gray-600">
          {subname}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="mb-2 w-full truncate text-sm text-gray-500 sm:mb-0 sm:max-w-[70%]">
          {whatsappLink}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-blue-500 text-blue-600 transition-colors hover:border-blue-600 hover:bg-blue-50"
          onClick={() => window.open(whatsappLink, "_blank")}
        >
          <MessageCircle className="h-4 w-4" />
          Join Now
        </Button>
      </CardContent>
    </Card>
  );
}
