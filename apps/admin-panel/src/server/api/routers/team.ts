import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Role } from "@/lib/members";
import { TRPCError } from "@trpc/server";

export const teamRouter = createTRPCRouter({
  getSingleTeam: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.form.findFirst({
        where: {
          id: input,
        },
        select: {
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              email: true,
              contact: true,
              college: true,
            },
          },
          events: {
            select: {
              formId: true,
              name: true,
              participants: true,
            },
          },
        },
      });
      if (!team) {
        throw new Error("Team not found");
      }
      return team;
    }),

  getAllTeamOfEvent: protectedProcedure
    .input(
      z.object({
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
        eventName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.form.findMany({
        //temporarily removed
        where: {
          // verfied: true,
          events: {
            some: {
              name: input.eventName,
            },
          },
        },
        orderBy: {
          cretedAt: input.sortOrder,
        },
        select: {
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              email: true,
              contact: true,
              college: true,
            },
          },
          events: {
            where: {
              name: input.eventName,
            },
            select: {
              formId: true,
              name: true,
              participants: true,
            },
          },
        },
      });
      console.log(teams);
      return teams;
    }),

  getAllCollegeTeam: protectedProcedure
    .input(
      z.object({
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
        isVerfied: z.enum(["verified", "notVerified", "all"]).default("all"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.form.findMany({
        where: {
          ...(input.isVerfied !== "all"
            ? { verfied: input.isVerfied === "verified" }
            : {}),
        },
        orderBy: {
          cretedAt: input.sortOrder,
        },
        select: {
          id: true,
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              college: true,
            },
          },
        },
      });
      return teams;
    }),

  updateVerifyStatus: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        verifyStatus: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.form.update({
        where: {
          id: input.teamId,
        },
        data: {
          verfied: input.verifyStatus,
        },
      });
      return team;
    }),

  updateTeamName: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        newTeamName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.form.update({
        where: {
          id: input.teamId,
        },
        data: {
          teamNmae: input.newTeamName,
        },
      });
      return team;
    }),

  //dangerous operation
  deleteTeam: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== Role.SUPER_ADMIN) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const team = await ctx.db.form.delete({
        where: {
          id: input,
        },
      });
      return team;
    }),
});
