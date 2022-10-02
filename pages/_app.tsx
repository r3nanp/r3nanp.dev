import 'styles/tailwind.css';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { Header } from 'components/Header';
import seo from 'next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo {...seo} />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
