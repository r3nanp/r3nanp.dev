import * as trpc from '@trpc/server';

import { prisma } from 'lib/prisma';

export const createContext = async () => ({ prisma });

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
