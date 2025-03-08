"use client";

import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast, Toaster } from "sonner";
import { api } from "@/trpc/react";
import { formSchema, type EventMembers } from "@/lib/type";
import { formDefaultValues } from "@/lib/default";
import { renderEventMembers } from "@/app/_components/form/renderEventMember";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/app/action";
import type { Session } from "next-auth";
import { UpdateFormSkeleton } from "@/app/_components/form/update-skeleton";

export default function Page() {
  const [user, setUser] = useState<Session | null>(null);
  const { data: userStatus } = api.user.isUserInfoComplete.useQuery();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserSession()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error updating session:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  //prefetch the group-links page
  // useEffect(() => {
  //   if (user?.user.id) {
  //     router.prefetch(`/group-links?teamLeaderId=${user.user.id}`);
  //   }
  // }, [user?.user.id, router]);

  const formSubmission = api.form.submitForm.useMutation({
    onSuccess: useCallback(() => {
      toast.success("Registration submitted successfully!", {
        duration: 1000,
        onAutoClose: () => {
          router.push(`/group-links?teamLeaderId=${user?.user.id}`);
        },
        onDismiss: () => {
          router.push(`/group-links?teamLeaderId=${user?.user.id}`);
        },
      });
      localStorage.removeItem("eventRegistrationForm");
    }, [user?.user.id, router]),

    onError: useCallback((err: { message?: string }) => {
      toast.error(err.message ?? "Failed to submit registration form");
    }, []),
  });

  //load the form data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("eventRegistrationForm");
    if (savedData) {
      // const parsedData: any = JSON.parse(savedData);
      // Object.keys(parsedData).forEach((key) => {
      //   form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
      // });
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsedData: Record<string, any> = JSON.parse(savedData);
        form.reset(parsedData); // Instead of setting each value manually
      } catch {
        console.error("Invalid form data in local storage");
      }
    }
  }, [form]);

  const saveFormLocally = useCallback(() => {
    localStorage.setItem(
      "eventRegistrationForm",
      JSON.stringify(form.getValues()),
    );
    toast.success("Form data saved locally!");
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userStatus?.isComplete) {
      toast.error(
        "Please add your college name and contact number  in profile page",
      );
      return;
    }
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

  if (loading) return <UpdateFormSkeleton />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50">
      <Toaster />
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

            {renderEventMembers("quiz", "Quiz Event", form)}
            {renderEventMembers("surpriseEvent", "Surprise Event", form)}
            {renderEventMembers("miniHackathon", "Mini Hackathon", form)}
            {renderEventMembers("gamingEvent", "Gaming Event", form)}
            {renderEventMembers("codingEvent", "Coding Event", form)}
            {renderEventMembers("groupDance", "Group Dance", form)}
            {renderEventMembers("reels", "Reels Event", form)}
            {renderEventMembers("itManager", "IT Manager", form)}

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
                disabled={formSubmission.isPending}
                type="submit"
                className="w-full max-w-md rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 text-white shadow-lg transition-all hover:shadow-xl hover:shadow-blue-200"
              >
                {formSubmission.isPending
                  ? "Submitting..."
                  : "Submit Registration"}
                {/* Submit Registration */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
