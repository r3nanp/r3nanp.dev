import * as trpc from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session, unstable_getServerSession as getServerSession } from 'next-auth';

import { prisma } from 'lib/prisma';
import { options } from 'pages/api/auth/[...nextauth]';

type CreateContextOptions = {
  session: Session | null;
};

const context = async (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma,
});

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerSession(req, res, options);

  return context({ session });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
