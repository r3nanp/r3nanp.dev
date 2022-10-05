import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import * as Tooltip from '@radix-ui/react-tooltip';
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
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const isMac = typeof window !== 'undefined' ? navigator.userAgent.indexOf('Mac') !== -1 : false;

export const Root = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const ACTIONS: Action[] = [
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['b'],
      icon: <BookOpenIcon className="h-8 w-8" />,
      keywords: 'writing words',
      perform: () => router.push('/blog'),
    },
  ];

  return <KBarProvider actions={ACTIONS}>{children}</KBarProvider>;
};

const Results = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ active, item }) => (typeof item === 'string' ? (
          <div className="bg-white p-4 text-xs uppercase text-gray-500">{item}</div>
      ) : (
          <div
            className="flex w-full items-center justify-between space-x-3 px-4 py-2.5 text-sm hover:cursor-pointer"
            style={{
              background: active ? 'rgb(245,245,245)' : '#fff',
              borderLeft: active ? '2px solid black' : '2px solid transparent',
            }}
          >
            <div>{item.icon}</div>

            <div className="flex w-full items-center justify-between">
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
        <KBarSearch
          className="min-w-96 rounded-sm px-4 py-2.5 focus-visible:outline-none"
          defaultPlaceholder="Type a command"
        />

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
