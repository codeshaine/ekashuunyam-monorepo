import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/type";

export const addMember = (
  eventName: keyof z.infer<typeof formSchema>,
  form: UseFormReturn<z.infer<typeof formSchema>>,
) => {
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

export const removeMember = (
  eventName: keyof z.infer<typeof formSchema>,
  index: number,
  form: UseFormReturn<z.infer<typeof formSchema>>,
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
