import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  userDetails: protectedProcedure.query(async ({ ctx }) => {
    // try {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        email: true,
        name: true,
        image: true,
        college: true,
        contact: true,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
    // } catch (err) {
    //   console.error(err);
    //   throw new TRPCError({
    //     code: "INTERNAL_SERVER_ERROR",
    //     message: "Unpexpected error occured",
    //   });
    // }
  }),

  updateUserDetails: protectedProcedure
    .input(
      z
        .object({
          college: z.string().optional(),
          name: z.string().optional(),
          contact: z.string().optional(),
        })
        .partial(),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
      return user;
    }),

  isUserInfoComplete: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          college: true,
          contact: true,
        },
      });
      if (!user) {
        return {
          isComplete: false,
        };
      }
      if (!user.college || !user.contact) {
        return {
          isComplete: false,
        };
      }
      return {
        isComplete: true,
      };
    } catch (err) {
      console.log(err);
      return {
        isComplete: false,
      };
    }
  }),
});
// hello: publicProcedure
// .input(z.object({ text: z.string() }))
// .query(({ input }) => {
//   return {
// greeting: `Hello ${input.text}`,
//   };
// }),
