import { visionTool } from '@sanity/vision';
import { createConfig } from 'sanity';
import { markdownSchema } from 'sanity-plugin-markdown';
import { deskTool } from 'sanity/desk';

export default createConfig({
  name: 'default',
  title: 'r3nanp',
  projectId: 'mqkn13r4',
  dataset: 'production',
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
});
