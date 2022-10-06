import 'styles/tailwind.css';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import * as Kbar from 'components/Kbar';
import seo from 'next-seo.config';
import { trpc } from 'utils/trpc';

function MyApp({ Component, pageProps }: AppProps<{ session: Session | null }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Kbar.Root>
        <NextSeo {...seo} />
        <Header />
        <Kbar.Content />
        <Component {...pageProps} />
        <Footer />
      </Kbar.Root>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
