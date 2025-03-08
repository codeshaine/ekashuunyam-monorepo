import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { formSchema } from "@/lib/type";

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
      const isFullTeam =
        Object.values(input).filter((arr) => arr && arr.length > 0).length ===
        8;

      const teamName = "Team " + crypto.randomUUID().slice(0, 4);

      // try {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      //check if there is two full team registerd from the same school count i dont want
      // the user to register more then two full team form a college
      const existingFullTeam = await ctx.db.form.count({
        where: {
          fullTeam: true,
          user: {
            college: user?.college,
          },
        },
      });
      if (existingFullTeam >= 2 && isFullTeam) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Your college has already two full team registered, please register for the individual event if possible",
        });
      }

      //check if the user has already registered one not full team
      const existingNotFullTeam = await ctx.db.form.count({
        where: {
          fullTeam: false,
          userId: ctx.session.user.id,
        },
      });

      if (existingNotFullTeam >= 1 && !isFullTeam) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "A user can only register one individual event team, please register for the full team if possible",
        });
      }

      const form = await ctx.db.form.create({
        data: {
          userId: ctx.session.user.id,
          fullTeam: isFullTeam,
          teamNmae: teamName,
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
      // } catch (error) {
      //   console.error(error);
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to submit form",
      //   });
      // }
    }),

  getAllForm: protectedProcedure.query(async ({ ctx }) => {
    const forms = await ctx.db.form.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        cretedAt: "desc",
      },
      select: {
        id: true,
        fullTeam: true,
        teamNmae: true,
        verfied: true,
        events: {
          select: {
            participants: true,
          },
        },
      },
    });

    return forms.map((form) => {
      const totalParticipants = form.events.reduce(
        (total, event) =>
          total +
          (Array.isArray(event.participants) ? event.participants.length : 0),
        0,
      );

      return {
        id: form.id,
        fullTeam: form.fullTeam,
        verfied: form.verfied,
        teamNmae: form.teamNmae,
        totalParticipants,
      };
    });
  }),

  getForm: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // try {
      const form = await ctx.db.form.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input.formId,
        },
        select: {
          events: true,
        },
      });

      if (!form) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Form not found",
        });
      }

      const formData = form.events.reduce(
        (acc, event) => {
          acc[event.name as keyof z.infer<typeof formSchema>] =
            event.participants as z.infer<typeof formSchema>[keyof z.infer<
              typeof formSchema
            >];
          return acc;
        },
        {} as z.infer<typeof formSchema>,
      );

      return formData;
      // } catch (error) {
      //   console.error(error);
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to get form data",
      //   });
      // }
    }),

  updateForm: protectedProcedure
    .input(z.object({ formId: z.string(), data: formSchema }))
    .mutation(async ({ ctx, input }) => {
      const { formId, data } = input;

      // try {
      const form = await ctx.db.$transaction(async (tx) => {
        await Promise.all(
          Object.entries(data).map(([name, participants]) => {
            return tx.event.upsert({
              where: {
                formId_name: { formId, name },
                form: {
                  userId: ctx.session.user.id,
                },
              },
              update: {
                participants: participants,
              },
              create: {
                name: name,
                participants: participants,
                form: {
                  connect: {
                    id: formId,
                  },
                },
              },
            });
          }),
        );
      });

      // const form = await ctx.db.event.update({
      //   where: {
      //     formId: formId,
      //     name: {
      //       in: Object.keys(data),
      //     },
      //     form: {
      //       userId: ctx.session.user.id,
      //     },
      //   },
      // });
      return form;
      // } catch (error) {
      //   console.error(error);
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to update form",
      //   });
      // }
    }),

  deleteForm: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // try {
      const form = await ctx.db.form.delete({
        where: {
          id: input.formId,
          userId: ctx.session.user.id,
        },
      });
      return form;
      // } catch (error) {
      //   console.error(error);
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to delete form",
      //   });
      // }
    }),
});
