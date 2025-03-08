import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { formSchema } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Users, Plus, Minus, AlertCircle } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { addMember, removeMember } from "@/lib/formUtils";

export const renderEventMembers = (
  eventName: keyof z.infer<typeof formSchema>,
  eventLabel: string,
  form: UseFormReturn<z.infer<typeof formSchema>>,
) => {
  const members = form.watch(eventName) ?? [];
  const isFlexibleEvent = eventName === "groupDance";

  const hasAnyData = members.some((m) => m.name ?? m.contact);
  const allMembersComplete = members.every((m) => m.name && m.contact);
  const showWarning = hasAnyData && !allMembersComplete;

  return (
    <Card className="border border-blue-100 bg-white">
      <CardHeader className="border-b border-blue-50 bg-blue-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">
            {eventLabel}
          </CardTitle>
          {isFlexibleEvent && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addMember(eventName, form)}
              disabled={members.length >= 6}
              className="rounded-2xl border-2 border-blue-200 bg-white px-4 py-2 text-blue-600 transition-all hover:bg-blue-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          )}
        </div>
        {showWarning && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-50 p-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            Please complete all member details for this event
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {members.map((_, index) => (
            <div
              key={index}
              className="member-card group rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-lg transition-all duration-200 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-700">
                    Member {index + 1}
                  </h3>
                </div>
                {isFlexibleEvent && members.length > 4 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeMember(eventName, index, form)}
                    className="rounded-xl bg-red-500 px-3 py-2 text-white transition-all hover:bg-red-600"
                  >
                    <Minus className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
              <FormField
                control={form.control}
                name={`${eventName}.${index}.name`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="group relative">
                        <Input
                          placeholder="Enter full name"
                          {...field}
                          value={field.value ?? ""}
                          className="block w-full rounded-2xl border-2 border-blue-100 bg-white/90 px-4 py-3.5 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 group-hover:border-blue-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${eventName}.${index}.contact`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <div className="group relative">
                        <Input
                          type="tel"
                          placeholder="Enter 10-digit mobile number"
                          {...field}
                          value={field.value ?? ""}
                          className="block w-full rounded-2xl border-2 border-blue-100 bg-white/90 px-4 py-3.5 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 group-hover:border-blue-200"
                        />
                        <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-hover:text-blue-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
