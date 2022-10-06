import { StarIcon } from '@heroicons/react/24/outline';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type Repository = {
  fork: boolean;
  stargazers_count: number;
};

type PinnedRepo = {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
};

export const getStaticProps: GetStaticProps = async () => {
  // credit: Lee Robinson https://github.com/leerob/leerob.io/blob/main/pages/api/github.ts

  const repos: Repository[] = await (await fetch('https://api.github.com/users/r3nanp/repos?per_page=100')).json();

  const mine = repos.filter(repo => !repo.fork);

  const starCount = mine?.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const pinnedRepos: PinnedRepo[] = await (await fetch('https://gh-pinned-repos.egoist.sh/?username=r3nanp')).json();

  if (!pinnedRepos) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      starCount,
      pinnedRepos,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

const ProjectCard: FC<{
  url: string;
  repo: string;
  description: string;
  stars: string;
  forks: string;
  language: string;
  languageColor: string;
}> = ({
  url, repo, stars, forks, description, language, languageColor,
}) => (
  <Link href={url} rel="noreferrer" target="_blank" passHref>
    <div className="flex h-40 transform cursor-pointer flex-col place-content-evenly rounded-lg border-2 bg-[#1c1c1c] p-4 text-white transition-transform duration-300 hover:scale-[104%]">
      <div className="flex flex-col gap-1">
        <p className="medium-text text-xl font-medium">{repo}</p>
        <p className="text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-0.5 pt-4 text-sm">
        <p className="flex items-center gap-1.5">
          <span className="rounded-full p-2" style={{ backgroundColor: languageColor }} />

          {language}
        </p>
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5">
            <StarIcon className="h-4 w-4" /> {stars}
          </span>

          <span className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4 fill-current"
              color="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z" />
            </svg>
            {forks}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: NextPage<{ pinnedRepos: PinnedRepo[]; starCount: number }> = ({ pinnedRepos, starCount }) => (
  <>
    <main className="flex flex-col justify-center bg-gray-900 px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-white md:text-5xl">Renan Pereira</h1>
            <h2 className="mb-4 text-gray-200">
              Software engineer at <span className="font-semibold">Wedy</span>
            </h2>
            <p className="mb-16 text-gray-400">
              Striving to innovate great solutions to modern-day problems. I specialize in development, but any activity
              requiring problem solving and creative thinking is where you will find me.
            </p>
          </div>

          <div className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]">
            <Image
              alt="Renan Pereira"
              className="rounded-full filter"
              height={176}
              sizes="30vw"
              src="https://avatars.githubusercontent.com/r3nanp"
              width={176}
              priority
            />
          </div>
        </div>

        <p className="pb-6 pl-0.5 text-slate-200">
          My projects have earned me <span className="bold-text font-bold">{starCount}</span> stars! I have a bunch of
          other cool projects that you can see on my{' '}
          <a
            className="text-blue-500 opacity-90 transition-opacity duration-300 hover:opacity-100"
            href="https://github.com/r3nanp"
            rel="noreferrer"
            target="_blank"
          >
            GitHub profile.
          </a>
        </p>

        <div className="grid auto-cols-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          {pinnedRepos?.map(project => (
            <ProjectCard key={project.repo} url={`https://github.com/${project.owner}/${project.repo}`} {...project} />
          ))}
        </div>
      </div>
    </main>
  </>
);

export default Home;
