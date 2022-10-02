import { ClientConfig } from 'next-sanity';

export const sanityConfig: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
};
