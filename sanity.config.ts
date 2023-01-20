import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { markdownSchema } from 'sanity-plugin-markdown';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  title: 'r3nanp - blog',
  projectId: import.meta.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_API_DATASET,
  plugins: [deskTool(), visionTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
          },
          {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
              },
            ],
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime',
          },
        ],
      },
    ],
  },
  tools: prev => {
    if (import.meta.env.DEV) {
      return prev;
    }

    return prev.filter(tool => tool.name !== 'vision');
  },
});
