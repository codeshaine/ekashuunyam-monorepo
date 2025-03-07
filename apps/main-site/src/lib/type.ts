import { z } from "zod";

export type EventMembers = { name: string; contact: string }[];

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

export const formSchema = z.object({
  quiz: createEventSchema(2, 2).optional(),
  surpriseEvent: createEventSchema(2, 2).optional(),
  miniHackathon: createEventSchema(2, 2).optional(),
  gamingEvent: createEventSchema(2, 2).optional(),
  codingEvent: createEventSchema(2, 2).optional(),
  groupDance: createEventSchema(4, 6).optional(),
  reels: createEventSchema(1, 1).optional(),
  itManager: createEventSchema(1, 1).optional(),
});
