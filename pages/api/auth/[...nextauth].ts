import NextAuth, { NextAuthOptions } from 'next-auth';
import { Provider } from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github';

const providers: Provider[] = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  }),
];

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers,
};

export default NextAuth(options);
