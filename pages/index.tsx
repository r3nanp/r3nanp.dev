import { Header } from "components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col justify-center bg-gray-900 px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
          <div className="flex flex-col-reverse items-start sm:flex-row">
            <div className="flex flex-col pr-8">
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                Renan Pereira
              </h1>
              <h2 className="mb-4 text-gray-700 dark:text-gray-200">
                Software engineer at <span className="font-semibold">Wedy</span>
              </h2>
              <p className="mb-16 text-gray-400">
                Striving to innovate great solutions to modern-day problems. I
                specialize in development, but any activity requiring problem
                solving and creative thinking is where you will find me.
              </p>
            </div>

            <div className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]">
              <Image
                alt="Renan Pereira"
                height={176}
                width={176}
                src="https://avatars.githubusercontent.com/r3nanp"
                sizes="30vw"
                priority
                className="rounded-full filter"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
