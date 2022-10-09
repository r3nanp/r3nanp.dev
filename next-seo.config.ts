import { NextSeoProps } from 'next-seo';

import { DOMAIN_URL } from 'constants/variables';

const seo: NextSeoProps = {
  title: 'Renan Pereira - Developer',
  description: 'Software engineer, Javascript enthusiast.',
  canonical: DOMAIN_URL,
  openGraph: {
    url: DOMAIN_URL,
    title: 'Renan Pereira - Developer',
    description: 'Software engineer, Javascript enthusiast.',
  },
};

export default seo;
