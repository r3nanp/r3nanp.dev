import createImageBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

import { sanityConfig } from './sanity-config';

const imageBuilder = createImageBuilder(sanityConfig);

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (preview: boolean) => (preview ? previewClient : sanityClient);

export const urlForImage = (source: object) => imageBuilder.image(source).auto('format').fit('max');
