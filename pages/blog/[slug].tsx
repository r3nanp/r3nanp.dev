import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/future/image';
import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import readingTime from 'reading-time';

import { getAllSlugs, getPost } from 'lib/queries';
import { getClient, sanityClient } from 'lib/sanity-server';
import { Post } from 'lib/types';
import { trpc } from 'utils/trpc';

export const getStaticProps: GetStaticProps = async ({ preview = false, params }) => {
  const slug = params?.slug as string;

  const post = await getClient(preview).fetch(getPost, {
    slug,
  });

  const source = await serialize(post.content, {
    mdxOptions: {
      format: 'mdx',
    },
  });

  const time = readingTime(post.content).text;
  const wordCount = post.content.split(/\s+/gu).length;
  const newSlug = post.slug.current;

  return {
    props: {
      post: {
        ...post,
        slug: newSlug,
        content: source,
        readingTime: time,
        wordCount,
      },
      preview,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(getAllSlugs);

  return {
    paths: paths.map(({ current }: { current: string }) => ({ params: { slug: current } })),
    fallback: 'blocking',
  };
};

const ViewCounter = ({ slug }: { slug: string }) => {
  const utils = trpc.useContext();

  const { mutate, data } = trpc.blog.addView.useMutation({
    onSuccess(input) {
      utils.blog.getView.invalidate({ slug: input.slug });
    },
  });

  useEffect(() => {
    mutate({
      slug,
    });
  }, [mutate, slug]);

  return <span>{`${data && data?.view > 0 ? Number(data?.view).toLocaleString() : '–––'} views`}</span>;
};

const LikeCounter = ({ slug }: { slug: string }) => {
  const [liked, setLiked] = useState(false);

  const utils = trpc.useContext();

  const { mutate, data } = trpc.blog.addLike.useMutation({
    onSuccess(input) {
      utils.blog.getView.invalidate({
        slug: input.slug,
      });
    },
  });

  const handleLike = async () => {
    setLiked(true);

    mutate({ slug });

    setTimeout(() => setLiked(false), 2000);
  };

  return (
    <div className="absolute right-0 bottom-0 z-10">
      <button
        className="flex cursor-pointer items-center justify-center gap-1 rounded-3xl bg-white p-2 text-sm transition-all hover:opacity-75"
        onClick={handleLike}
      >
        <HandThumbUpIcon className={clsx('h-6 w-6', liked ? 'fill-black' : 'fill-transparent')} />{' '}
        <span>{`${data && data?.count > 0 ? Number(data?.count).toString() : '0'}`}</span>
      </button>
    </div>
  );
};

const BlogLayout: FC<{ post: Post; children: ReactNode }> = ({ post, children }) => (
  <main className="flex flex-col justify-center bg-gray-900 px-8">
    <article className="relative mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">{post?.title}</h1>
      <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
        <Image
          alt="Renan Pereira"
          className="rounded-full"
          height={24}
          sizes="20vw"
          src="https://avatars.githubusercontent.com/r3nanp"
          width={24}
        />

        <p className="ml-2 text-sm text-gray-300">
          {'Renan Pereira / '} {format(parseISO(post.date), 'MMMM dd, yyyy')}
        </p>

        <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
          {post.readingTime}
          {' • '}
          <ViewCounter slug={post.slug} />
        </p>

        <LikeCounter slug={post.slug} />
      </div>

      <div className="prose mt-4 w-full max-w-none text-white">{children}</div>
    </article>
  </main>
);

const BlogPage: NextPage<{ post: Post }> = ({ post }) => {
  if (!post) return null;

  return (
    <BlogLayout post={post}>
      <MDXRemote {...post.content} />
    </BlogLayout>
  );
};

export default BlogPage;
