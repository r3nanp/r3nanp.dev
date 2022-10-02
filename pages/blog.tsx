import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Blog: NextPage = () => (
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
            // onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </main>
  </>
);

export default Blog;
