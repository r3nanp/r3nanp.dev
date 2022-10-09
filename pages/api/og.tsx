/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextApiRequest } from 'next';

const DOMAIN_URL = (process.env.NEXTAUTH_URL ?? '').replace(/\/$/, '');

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
          color: '#FFF',
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          height: '100vh',
          background: '#424874',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '1200px',
            height: '630px',
            padding: '80px',
          }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '28px',
              marginBottom: '25px',
              color: '#c4c4c4',
            }}
          >
            {top}
          </p>

          <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '28px',
                color: '#c4c4c4',
              }}
            >
              r3nanp.dev
            </p>
            <img
              alt="r3nanp"
              height={70}
              src={`${DOMAIN_URL}/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fr3nanp&w=828&q=75`}
              style={{
                borderRadius: '100px',
              }}
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
