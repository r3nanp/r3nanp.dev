/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextApiRequest } from 'next';

import { DOMAIN_URL } from 'constants/variables';

const weight = {
  bold: 'Bold',
  regular: 'Regular',
};

const fonts = {
  Jetbrains: 'JetBrainsMono',
  Poppins: 'Poppins',
};

export const config = {
  runtime: 'experimental-edge',
};

const fetchFont = async (fontName: keyof typeof fonts, fontWeight: keyof typeof weight) => {
  const response = await fetch(`${DOMAIN_URL}/fonts/${fonts[fontName]}${weight[fontWeight]}.ttf`);

  if (!response.ok) throw new Error('Something went wrong while fetching data.');

  const buffer = await response.arrayBuffer();

  return buffer;
};

export default async function handler(req: NextApiRequest) {
  if (!DOMAIN_URL) throw new Error('Missing DOMAIN_URL env');

  const JetbrainsMonoArrayBuffer = await fetchFont('Jetbrains', 'regular');

  const PoppinsArrayBuffer = await fetchFont('Poppins', 'bold');

  const { searchParams } = new URL(req.url!);

  const title = searchParams.get('title') ?? '';
  const top = searchParams.get('top') ?? '';

  const lg = {
    fontSize: '72px',
    lineHeight: '80px',
    fontWeight: 800,
    fontFamily: fonts.Poppins,
    color: '#fff',
  };
  const md = {
    fontSize: '62px',
    lineHeight: '70px',
    fontWeight: 900,
    fontFamily: fonts.Poppins,
    color: '#fff',
  };

  return new ImageResponse(
    (
      <body
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
        tw="text-white h-screen flex justify-center items-center bg-[#424874]"
      >
        <div tw="flex flex-col items-start justify-between w-[1200px] h-[630px] p-[80px]">
          {top ? (
            <p
              style={{
                fontFamily: 'JetBrains Mono',
              }}
              tw="mb-[25px] text-[28px] text-[#c4c4c4]"
            >
              {top}
            </p>
          ) : null}

          <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

          <div tw="w-full flex items-center justify-between">
            <p
              style={{
                fontFamily: 'JetBrains Mono',
              }}
              tw="text-[28px] text-[#c4c4c4]"
            >
              r3nanp.dev
            </p>
            <img
              alt="r3nanp"
              height={70}
              src={`${DOMAIN_URL}/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fr3nanp&w=828&q=75`}
              tw="rounded-[100px]"
              width={70}
            />
          </div>
        </div>
      </body>
    ),
    {
      fonts: [
        {
          name: 'Poppins',
          data: PoppinsArrayBuffer,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: JetbrainsMonoArrayBuffer,
          weight: 500,
          style: 'normal',
        },
      ],
    },
  );
}
