"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";

const memberSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .or(z.literal(""))
    .nullable(),
  contact: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number")
    .or(z.literal(""))
    .nullable(),
});

const createEventSchema = (minMembers: number, maxMembers: number) => {
  return z.array(memberSchema).refine(
    (members) => {
      // Check if any data has been entered for this event
      const hasAnyData = members.some((m) => m.name ?? m.contact);
      if (!hasAnyData) return true; // Empty events are valid

      // If data exists, validate member count
      if (members.length < minMembers || members.length > maxMembers) {
        return false;
      }

      // For events with data, all members must be complete
      return members.every((m) => m.name && m.contact);
    },
    {
      message: `Please complete all member details for this event`,
    },
  );
};

type EventMembers = { name: string; contact: string }[];

const formSchema = z.object({
  quiz: createEventSchema(2, 2).optional(),
  surpriseEvent: createEventSchema(2, 2).optional(),
  miniHackathon: createEventSchema(2, 3).optional(),
  gamingEvent: createEventSchema(2, 2).optional(),
  codingEvent: createEventSchema(2, 2).optional(),
  groupDance: createEventSchema(4, 6).optional(),
  reels: createEventSchema(1, 1).optional(),
  itManager: createEventSchema(1, 1).optional(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz: [
        { name: "", contact: "" },
        { name: "", contact: "" },
      ],
      surpriseEvent: [
        { name: "", contact: "" },
        { name: "", contact: "" },
      ],
      miniHackathon: [
        { name: "", contact: "" },
        { name: "", contact: "" },
      ],
      gamingEvent: [
        { name: "", contact: "" },
        { name: "", contact: "" },
      ],
      codingEvent: [
        { name: "", contact: "" },
        { name: "", contact: "" },
      ],
      groupDance: Array(4).fill({ name: "", contact: "" }),
      reels: [{ name: "", contact: "" }],
      itManager: [{ name: "", contact: "" }],
    },
  });
  const formSubmission = api.form.submitForm.useMutation({
    onSuccess: () => {
      // localStorage.removeItem("eventRegistrationForm");
      toast.success("Registration submitted successfully!");
    },
    onError: () => {
      toast.error("Error submitting registration");
    },
  });
  /* eslint-disable */
  useEffect(() => {
    const savedData = localStorage.getItem("eventRegistrationForm");
    if (savedData) {
      const parsedData: any = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
      });
    }
  }, [form]);
  /* eslint-disable */

  const addMember = (eventName: keyof z.infer<typeof formSchema>) => {
    const currentMembers = form.getValues(eventName);
    if (!currentMembers) return;

    const maxMembers = {
      miniHackathon: 3,
      groupDance: 6,
      quiz: 2,
      surpriseEvent: 2,
      gamingEvent: 2,
      codingEvent: 2,
      reels: 1,
      itManager: 1,
    };

    if (currentMembers.length < maxMembers[eventName]) {
      const newMembers = [...currentMembers, { name: "", contact: "" }];
      form.setValue(eventName, newMembers);
    }
  };

  const removeMember = (
    eventName: keyof z.infer<typeof formSchema>,
    index: number,
  ) => {
    const currentMembers = form.getValues(eventName);
    if (!currentMembers) return;

    const minMembers = {
      miniHackathon: 2,
      groupDance: 4,
      quiz: 2,
      surpriseEvent: 2,
      gamingEvent: 2,
      codingEvent: 2,
      reels: 1,
      itManager: 1,
    };

    if (currentMembers.length > minMembers[eventName]) {
      const newMembers = currentMembers.filter((_, i) => i !== index);
      form.setValue(eventName, newMembers);
    }
  };

  const saveFormLocally = () => {
    const formData = form.getValues();
    localStorage.setItem("eventRegistrationForm", JSON.stringify(formData));
    toast.success("Form data saved locally!");
  };

  const renderEventMembers = (
    eventName: keyof z.infer<typeof formSchema>,
    eventLabel: string,
  ) => {
    const members = form.watch(eventName) ?? [];
    const isFlexibleEvent =
      eventName === "miniHackathon" || eventName === "groupDance";

    // Only show warning if this event has some data but is incomplete
    const hasAnyData = members.some((m) => m.name ?? m.contact);
    const allMembersComplete = members.every((m) => m.name && m.contact);
    const showWarning = hasAnyData && !allMembersComplete;

    return (
      <>
        <Toaster />
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{eventLabel}</CardTitle>
              {isFlexibleEvent && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addMember(eventName)}
                  disabled={
                    members.length >= (eventName === "miniHackathon" ? 3 : 6)
                  }
                >
                  Add Member +
                </Button>
              )}
            </div>
            {showWarning && (
              <div className="mt-2 text-sm text-red-500">
                Please complete all member details for this event
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {members.map((_, index) => (
                <div key={index} className="rounded-lg border bg-gray-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Member {index + 1}</h3>
                    {isFlexibleEvent &&
                      members.length >
                        (eventName === "miniHackathon" ? 2 : 4) && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeMember(eventName, index)}
                        >
                          Remove
                        </Button>
                      )}
                  </div>
                  <FormField
                    control={form.control}
                    name={`${eventName}.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            {...field}
                            value={field.value ?? ""}
                          />
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
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            {...field}
                            value={field.value ?? ""}
                          />
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
      </>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Filter out events with no data entered or incomplete data
    const completeEvents = Object.entries(values).reduce<
      Record<string, EventMembers>
    >((acc, [key, members]) => {
      if (!members) return acc;

      // Skip events with no data entered
      const hasData = members.some((m) => m.name ?? m.contact);
      if (!hasData) return acc;

      // Only include fully completed events
      const allComplete = members.every((m) => m.name && m.contact);
      if (!allComplete) {
        toast.error(`Please complete all member details for ${key}`);
        return acc;
      }

      acc[key] = members as EventMembers;
      return acc;
    }, {});

    if (Object.keys(completeEvents).length === 0) {
      toast.error("Please complete at least one event registration fully");
      return;
    }

    await formSubmission.mutateAsync(completeEvents);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Event Registration Form
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4 text-sm text-gray-600">
            * Register for at least one event. For each event you register, all
            member details must be completed.
          </div>
          {renderEventMembers("quiz", "Quiz Event")}
          {renderEventMembers("surpriseEvent", "Surprise Event")}
          {renderEventMembers("miniHackathon", "Mini Hackathon")}
          {renderEventMembers("gamingEvent", "Gaming Event")}
          {renderEventMembers("codingEvent", "Coding Event")}
          {renderEventMembers("groupDance", "Group Dance")}
          {renderEventMembers("reels", "Reels Event")}
          {renderEventMembers("itManager", "IT Manager")}

          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full max-w-md"
              onClick={saveFormLocally}
            >
              Save Progress
            </Button>
            <Button type="submit" className="w-full max-w-md">
              Submit Registration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
