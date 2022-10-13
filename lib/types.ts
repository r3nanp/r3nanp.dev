import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  description: string;
  coverImage: {
    alt: string
  };
  readingTime: string;
  wordCount: number;
};
