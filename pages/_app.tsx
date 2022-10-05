import 'styles/tailwind.css';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import * as Kbar from 'components/Kbar';
import seo from 'next-seo.config';
import { trpc } from 'utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Kbar.Root>
      <NextSeo {...seo} />
      <Header />
      <Kbar.Content />
      <Component {...pageProps} />
      <Footer />
    </Kbar.Root>
  );
}

export default trpc.withTRPC(MyApp);
