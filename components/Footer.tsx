import Link from 'next/link';

const LINKS = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/blog',
    text: 'Blog',
  },
];

export function Footer() {
  return (
    <footer className="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center">
      <hr className="border-1 mb-8 w-full border-gray-800" />

      <div className="grid w-full px-10 lg:px-0 grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          {LINKS.map((link, idx) => (
            <Link key={`${link.text}-${idx}`} href={link.href}>
              <a className="text-gray-500 transition hover:text-gray-600">{link.text}</a>
            </Link>
          ))}
        </div>
        <div className="flex flex-col space-y-4">
          <a
            className="text-gray-500 transition hover:text-gray-600"
            href="https://github.com/r3nanp"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
          <a
            className="text-gray-500 transition hover:text-gray-600"
            href="https://www.linkedin.com/in/r3nanp"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
