import { GetServerSideProps } from 'next';
import RSS from 'rss';

import { DOMAIN_URL } from 'constants/variables';
import { sanityClient } from 'lib/sanity-server';

type SanityResponse = {
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: 'r3nanp.dev',
    site_url: `${DOMAIN_URL}`,
    feed_url: `${DOMAIN_URL}/feed.xml`,
  });

  const slugs = await sanityClient.fetch<SanityResponse[]>(`
    *[_type == "post"]{
      _createdAt, title, slug { current }, description
    }
  `);

  slugs.map(content => feed.item({
    title: content.title,
    url: `${DOMAIN_URL}/blog/${content.slug.current}`,
    // eslint-disable-next-line no-underscore-dangle
    date: content._createdAt,
    description: content.description,
    author: 'Renan Pereira',
  }));

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
};

export default function RSSFeed() {
  return null;
}
