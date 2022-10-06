import { blogRouter } from './subroutes/blog';
import { guestbookRouter } from './subroutes/guestbook';
import { t } from './trpc';

export const appRouter = t.router({
  blog: blogRouter,
  guestbook: guestbookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
