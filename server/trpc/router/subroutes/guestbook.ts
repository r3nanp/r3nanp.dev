import { z } from 'zod';

import { t } from 'server/trpc';

export const guestbookRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.guestbook.findMany({
      select: {
        name: true,
        message: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return messages;
  }),

  postMessage: t.procedure.input(
    z.object({
      name: z.string(),
      message: z.string().max(100),
    }),
  ).mutation(async ({ ctx, input }) => {
    const { message, name } = input;

    await ctx.prisma.guestbook.create({
      data: {
        message,
        name,
      },
    });
  }),
});
