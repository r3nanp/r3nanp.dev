import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Provider } from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from 'lib/prisma';

const providers: Provider[] = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  }),
];

export const options: NextAuthOptions = {
  providers,
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(options);
