import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const formRouter = createTRPCRouter({
  submitForm: protectedProcedure
    .input(
      z.object({
        quiz: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        surpriseEvent: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        miniHackathon: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        gamingEvent: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        codingEvent: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        groupDance: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        reels: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
        itManager: z
          .array(
            z.object({
              name: z.string().min(2, "Name must be at least 2 characters"),
              contact: z
                .string()
                .regex(
                  /^[6-9]\d{9}$/,
                  "Please enter a valid 10-digit Indian mobile number",
                ),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const form = await ctx.db.form.create({
          data: {
            userId: ctx.session.user.id,
          },
        });

        const events = Object.entries(input).map(([name, participants]) => {
          return {
            name,
            participants,
            formId: form.id,
          };
        });

        await ctx.db.event.createMany({
          data: events,
        });

        return form;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit form",
        });
      }
    }),
});
