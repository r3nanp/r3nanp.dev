import { groq } from 'next-sanity';

export const getAllSlugs = groq`*[_type == "post"][].slug`;

export const getPost = groq`*[_type == "post" && slug.current == $slug][0]`;

export const getAllPosts = groq`*[_type == "post"] | order(date desc, _updatedAt desc) {
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
}`;
