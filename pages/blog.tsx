import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { BlogPost } from 'components/BlogPost';
import { getAllPosts } from 'lib/queries';
import { getClient } from 'lib/sanity-server';
import { Post } from 'lib/types';

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(getAllPosts);

  return {
    props: {
      posts,
      preview,
    },
    revalidate: 60 * 60 * 24,
  };
};

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = searchValue.length > 0 ? posts?.filter(post => post?.title?.toLowerCase().includes(searchValue.toLowerCase())) : posts;

  return (
    <>
      <NextSeo
        description="Thoughts on the software industry, programming, tech and personal life"
        title="Blog - Renan Pereira"
      />

      <main className="flex flex-col justify-center bg-gray-900 px-8">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">Blog</h1>
          <p className="mb-4 text-gray-400">
            {`I've been creating stuff online since 2018
                  In total, I've written  articles on my blog.
                  Use the search below to filter by title.`}
          </p>
          <div className="relative mb-4 w-full">
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>

            <input
              aria-label="Search articles"
              className="block w-full rounded-md border border-gray-900 bg-gray-800 px-10 py-2 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search articles"
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            All Posts
          </h3>

          {filteredBlogPosts?.length === 0 && <p className="mb-4 text-gray-600 dark:text-gray-400">No posts found.</p>}

          {posts?.map(post => (
            <BlogPost key={post.title} {...post} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Blog;
