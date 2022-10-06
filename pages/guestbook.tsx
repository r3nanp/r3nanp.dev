import clsx from 'clsx';
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/future/image';
import { FC, useState } from 'react';

const Signature: FC<{ name: string; message: string }> = ({ name, message }) => (
  <div className="flex flex-col text-white">
    <p className="text-sm md:text-xl">{message}</p>
    <p className="sm:text-sm md:text-base"> - {name}</p>
  </div>
);

const LogOutButton = () => (
  <button
    className="border-t-purple hover:bg-t-purple mt-2 cursor-pointer rounded-md border-2 border-opacity-80 px-3 py-2 text-sm transition-colors duration-300 hover:bg-opacity-30 hover:text-white"
    onClick={() => signOut()}
  >
    Log Out
  </button>
);

const Guestbook: NextPage = () => {
  const { data: sesh, status } = useSession();
  const [message, setMessage] = useState('');

  if (status === 'loading') return <p>Loading...</p>;

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

        {/* <p className="text-sm text-t-red">{error}</p> */}
        <input
          className="border-t-pink mt-1 w-full rounded-md border-2 border-opacity-80 bg-zinc-800 px-4 py-2 text-xl text-slate-200 focus:border-opacity-100 focus:outline-none"
          id="message"
          name="message"
          placeholder="Your message..."
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              className="border-t-purple hover:bg-t-purple mt-2 cursor-pointer rounded-md border-2 border-opacity-80 px-3 py-2 text-sm transition-colors duration-300 hover:bg-opacity-30 hover:text-white disabled:opacity-80"
              // disabled={loading}
              type="submit"
              onClick={() => {}}
            >
              Sign
            </button>

            <LogOutButton />
          </div>

          <p className={clsx('text-lg', message.length > 100 ? 'text-t-red' : 'text-t-pink')}>{message.length}/100</p>
        </div>

        <div className="pt-10" />

        <div className="flex flex-col gap-6">
          {[{ message: 'aaa', name: 'Renan' }]?.map((msg, index) => (
            <Signature key={index} message={msg.message} name={msg.name} />
          ))}
        </div>
      </>
    );
  }

  return (
    <main className="flex flex-col justify-center bg-gray-900 px-8">
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-100 md:text-xl">Guestbook</h2>

        <div className="border-t-pink flex items-center gap-4 rounded-md border-2 border-opacity-60 bg-[#202020] p-4">
          <button
            className="flex-none hover:opacity-75 rounded-md border-2 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-opacity-30 hover:text-white"
            onClick={() => signIn('github')}
          >
            Log In
          </button>
          <p className="w-2/3 pt-1.5 text-sm text-slate-300">
            Log in with Github to comment. Your information is only used to display your name to avoid impersonation.
          </p>
        </div>

        <div className="pt-10" />

        <div className="flex flex-col gap-6">
          {[{ message: 'aaa', name: 'Renan' }]?.map((msg, index) => (
            <Signature key={index} message={msg.message} name={msg.name} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Guestbook;
