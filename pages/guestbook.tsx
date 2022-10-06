import clsx from 'clsx';
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Image from 'next/future/image';
import { FC, useState } from 'react';

import { Spinner } from 'components/Spinner';
import { trpc } from 'utils/trpc';

const Signature: FC<{ name: string; message: string }> = ({ name, message }) => (
  <div className="flex max-w-xs flex-col text-white lg:max-w-none">
    <p className="break-words text-sm md:text-xl">{message}</p>
    <p className="sm:text-sm md:text-base"> - {name}</p>
  </div>
);

const LogOutButton = () => (
  <button
    className="mt-2 cursor-pointer rounded-md border-2 border-opacity-80 px-3 py-2 text-sm text-white transition-colors duration-300 hover:opacity-75"
    onClick={() => signOut()}
  >
    Log Out
  </button>
);

const Guests = () => {
  const { data: sesh, status } = useSession();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const context = trpc.useContext();
  const { data: messages } = trpc.guestbook.getAll.useQuery();
  const { mutate } = trpc.guestbook.postMessage.useMutation({
    onMutate: () => {
      context.guestbook.getAll.cancel();

      const optimisticUpdate = context.guestbook.getAll.getData();

      context.guestbook.getAll.setData(optimisticUpdate);
    },
    onSettled: () => {
      context.guestbook.getAll.invalidate();
    },
  });

  const handleSubmit = async () => {
    setLoading(true);

    if (message.length === 0) {
      setLoading(false);
      setError('Your message is empty!');
      return;
    }

    if (message.length > 100) {
      setLoading(false);
      setError('Your message must be less than 100 characters.');
      return;
    }

    mutate({ message, name: sesh?.user?.name as string });

    setMessage('');
    setLoading(false);
  };

  if (status === 'loading') return <Spinner className="mx-auto" />;

  if (sesh) {
    return (
      <>
        {sesh.user?.image && (
          <div className="flex items-center gap-2">
            <Image
              alt={sesh.user?.name ?? 'Profile'}
              className="rounded-[50%]"
              height={36}
              src={sesh.user?.image}
              width={36}
            />

            <p>- Signed in as {sesh.user.name}</p>
          </div>
        )}

        <div className="pt-3" />

        <p className="text-sm text-red-500">{error}</p>
        <textarea
          className="border-t-pink mt-1 h-40 w-full rounded-md border-2 border-opacity-80 bg-zinc-800 px-4 py-2 text-xl text-slate-200 focus:border-opacity-100 focus:outline-none"
          id="message"
          name="message"
          placeholder="Your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              className="border-t-purple hover:bg-t-purple mt-2 cursor-pointer rounded-md border-2 border-opacity-80 px-3 py-2 text-sm transition-colors duration-300 hover:bg-opacity-30 hover:text-white disabled:opacity-80"
              disabled={loading}
              type="submit"
              onClick={handleSubmit}
            >
              Sign
            </button>

            <LogOutButton />
          </div>

          <p className={clsx('text-lg', message.length > 100 ? 'text-red-500' : 'text-pink-200')}>
            {message.length}/100
          </p>
        </div>

        <div className="pt-10" />

        <div className="flex max-w-2xl flex-col gap-6">
          {messages?.map((msg, index) => (
            <Signature key={index} message={msg.message} name={msg.name} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 rounded-md border-2 border-opacity-60 bg-[#202020] p-4">
        <button
          className="flex-none rounded-md border-2 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-opacity-30 hover:text-white hover:opacity-75"
          onClick={() => signIn('github')}
        >
          Log In
        </button>
        <p className="pt-1.5 text-sm text-slate-300">
          Log in with Github to comment. Your information is only used to display your name to avoid impersonation.
        </p>
      </div>

      <div className="pt-10" />

      <div className="flex max-w-2xl flex-col gap-6">
        {messages?.map((msg, index) => (
          <Signature key={index} message={msg.message} name={msg.name} />
        ))}
      </div>
    </>
  );
};

const Guestbook: NextPage = () => (
  <main className="flex flex-col justify-center px-8">
    <NextSeo description="Sign my guestbook and cement your name on my website" title="Guestbook - Renan Pereira" />
    <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-100 md:text-xl">Guestbook</h2>

      <p className="pt-1 text-slate-200">
        Leave a comment below. It could be anything – appreciation, information, a joke, a quote or even a cool face.
        Surprise me!
      </p>
      <Guests />
    </div>
  </main>
);

export default Guestbook;
