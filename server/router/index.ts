import { t } from './trpc';

export const appRouter = t.router({});

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
