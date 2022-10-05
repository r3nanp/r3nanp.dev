import { blogRouter } from './subroutes/blog';
import { t } from './trpc';

export const appRouter = t.router({
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
