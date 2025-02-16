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
import { Mail, Users, Plus, Minus, AlertCircle } from "lucide-react";

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
      const hasAnyData = members.some((m) => m.name ?? m.contact);
      if (!hasAnyData) return true;
      if (members.length < minMembers || members.length > maxMembers) {
        return false;
      }
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
      toast.success("Registration submitted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      toast.error("Error submitting registration");
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("eventRegistrationForm");
    if (savedData) {
      const parsedData: any = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
      });
    }
  }, [form]);

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

    const hasAnyData = members.some((m) => m.name ?? m.contact);
    const allMembersComplete = members.every((m) => m.name && m.contact);
    const showWarning = hasAnyData && !allMembersComplete;

    return (
      <>
        <Toaster />
        <Card className="overflow-hidden rounded-3xl border border-blue-100 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-200 hover:bg-white hover:shadow-2xl">
          <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-sky-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800">
                {eventLabel}
              </CardTitle>
              {isFlexibleEvent && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addMember(eventName)}
                  disabled={
                    members.length >= (eventName === "miniHackathon" ? 3 : 6)
                  }
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
                    {isFlexibleEvent &&
                      members.length >
                        (eventName === "miniHackathon" ? 2 : 4) && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeMember(eventName, index)}
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
      </>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const completeEvents = Object.entries(values).reduce<
      Record<string, EventMembers>
    >((acc, [key, members]) => {
      if (!members) return acc;
      const hasData = members.some((m) => m.name ?? m.contact);
      if (!hasData) return acc;
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

      <div className="container relative mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
            Join Our Events
          </h1>
          <p className="text-lg text-gray-600">
            Register for the events and be part of something amazing
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="rounded-2xl border border-blue-100 bg-white/90 p-4 text-sm text-gray-600 shadow-lg backdrop-blur-xl">
              * Register for at least one event. For each event you register,
              all member details must be completed.
            </div>

            {renderEventMembers("quiz", "Quiz Event")}
            {renderEventMembers("surpriseEvent", "Surprise Event")}
            {renderEventMembers("miniHackathon", "Mini Hackathon")}
            {renderEventMembers("gamingEvent", "Gaming Event")}
            {renderEventMembers("codingEvent", "Coding Event")}
            {renderEventMembers("groupDance", "Group Dance")}
            {renderEventMembers("reels", "Reels Event")}
            {renderEventMembers("itManager", "IT Manager")}

            <div className="flex justify-center gap-6">
              <Button
                type="button"
                variant="outline"
                onClick={saveFormLocally}
                className="w-full max-w-md rounded-2xl border-2 border-blue-200 bg-white px-6 py-4 text-blue-600 shadow-lg transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-xl"
              >
                Save Progress
              </Button>
              <Button
                type="submit"
                className="w-full max-w-md rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 text-white shadow-lg transition-all hover:shadow-xl hover:shadow-blue-200"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
