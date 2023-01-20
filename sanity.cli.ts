import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    dataset: process.env.SANITY_STUDIO_API_PROJECT_ID,
    projectId: process.env.SANITY_STUDIO_API_DATASET,
  },
});
