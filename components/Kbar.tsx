import {
  BookOpenIcon, HomeIcon, MagnifyingGlassIcon, PencilSquareIcon,
} from '@heroicons/react/24/outline';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {
  useKBar,
  KBarProvider,
  Action,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from 'kbar';
import Router from 'next/router';
import { ReactNode } from 'react';

const isMac = typeof window !== 'undefined' ? navigator.userAgent.indexOf('Mac') !== -1 : false;

const ACTIONS: Action[] = [
  {
    id: 'Home',
    name: 'Home',
    shortcut: ['h'],
    icon: <HomeIcon className="h-8 w-8" />,
    keywords: 'home',
    perform: () => Router.push('/'),
  },
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    icon: <BookOpenIcon className="h-8 w-8" />,
    keywords: 'writing words',
    perform: () => Router.push('/blog'),
  },
  {
    id: 'guestbook',
    name: 'Guestbook',
    icon: <PencilSquareIcon className="h-8 w-8" />,
    keywords: 'writing words',
    perform: () => Router.push('/guestbook'),
  },
];

export const Root = ({ children }: { children: ReactNode }) => (
  <KBarProvider actions={ACTIONS}>{children}</KBarProvider>
);

const Results = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ active, item }) => (typeof item === 'string' ? (
          <div className="bg-white p-4 text-xs uppercase text-gray-500">{item}</div>
      ) : (
          <div
            className={clsx(
              'flex w-full items-center justify-between space-x-3 px-4 py-2.5 text-sm hover:cursor-pointer',
              active ? 'border-l-2 border-black bg-gray-200/90' : 'border-l-2 border-transparent bg-white',
            )}
          >
            <div className='text-gray-900'>{item.icon}</div>

            <div className="flex w-full text-gray-900 items-center justify-between">
              <span>{item.name}</span>
              <span className="space-x-1">
                {item.shortcut?.map(shortcut => (
                  <kbd key={shortcut} className="rounded-sm bg-gray-700 px-2 py-1 text-white">
                    {shortcut}
                  </kbd>
                ))}
              </span>
            </div>
          </div>
      ))
      }
    />
  );
};

export const Content = () => (
  <KBarPortal>
    <KBarPositioner>
      <KBarAnimator className="w-full max-w-2xl rounded bg-white shadow-lg">
        <div className="border-b border-gray-400">
          <KBarSearch
            className="min-w-96 rounded-sm px-4 py-2.5 focus-visible:outline-none"
            defaultPlaceholder="Type a command"
          />
        </div>

        <Results />
      </KBarAnimator>
    </KBarPositioner>
  </KBarPortal>
);

export const Trigger = () => {
  const { query } = useKBar();

  return (
    <div className="flex">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="group flex w-full items-center rounded-sm px-2 py-2 text-sm font-medium text-neutral-500 hover:bg-gray-50 hover:text-neutral-900"
              color="minimal"
              onClick={query.toggle}
            >
              <span className="h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-neutral-500 ltr:mr-3 rtl:ml-3">
                <MagnifyingGlassIcon />
              </span>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              align="center"
              className="flex select-none flex-col rounded bg-white p-2 text-center text-black shadow-lg"
              side="bottom"
            >
              <Tooltip.Arrow />
              <span>{isMac ? '⌘ + K' : 'CTRL + K'}</span>
              <span className="hidden lg:inline lg:text-xs">Command bar</span>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};
