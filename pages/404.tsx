import Link from 'next/link';

const FourOhFourPage = () => (
  <main className="flex flex-col justify-center px-8">
    <div className="mx-auto mb-16 flex max-w-2xl w-full flex-col items-start justify-start">
      <div className="flex flex-col">
        <h2 className="text-4xl text-purple-500">404</h2>
        <p>
          Looks like you&apos;re lost. In the meantime read my{' '}
          <Link href="/blog">
            <a className="text-purple-500 opacity-75 transition-opacity duration-300 hover:opacity-100">blog</a>
          </Link>{' '}
          maybe?
        </p>
      </div>
    </div>
  </main>
);

export default FourOhFourPage;
