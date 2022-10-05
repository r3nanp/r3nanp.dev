import Link from 'next/link';
import { FC } from 'react';

import { trpc } from 'utils/trpc';

export const BlogPost: FC<{ slug: string; title: string; description: string }> = ({ slug, title, description }) => {
  const { data } = trpc.blog.getView.useQuery({ slug });

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full">
        <div className="mb-8 w-full">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="mb-2 w-full text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl">{title}</h4>
            <p className="mb-4 w-32 text-left text-gray-500 md:mb-0 md:text-right">
              {`${data?.view ? data?.view.toLocaleString() : '–––'} views`}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </a>
    </Link>
  );
};
