import { z } from 'zod';

import { t } from '../trpc';

export const blogRouter = t.router({
  addView: t.procedure
    .input(
      z.object({
        slug: z.string().max(128),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newOrUpdatedViews = await ctx.prisma.blog.upsert({
        where: { slug: input.slug },
        create: {
          slug: input.slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return newOrUpdatedViews;
    }),
  getView: t.procedure
    .input(
      z.object({
        slug: z.string().max(128),
      }),
    )
    .query(async ({ ctx, input }) => {
      const views = await ctx.prisma.blog.findUnique({
        where: {
          slug: input.slug,
        },
      });

      return views;
    }),

  getAllViews: t.procedure.query(async ({ ctx }) => {
    const totalViews = await ctx.prisma.blog.aggregate({
      _sum: {
        count: true,
      },
    });

    return totalViews;
  }),
});
