import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { Context } from './context';

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthedMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user || !ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers that `user` and `session` are non-nullable to downstream procedures
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const authedProcedure = t.procedure.use(isAuthedMiddleware);
