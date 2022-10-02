import { NextApiRequest, NextApiResponse } from 'next';

const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN ?? '';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'; // https://developer.spotify.com/console/get-users-currently-playing-track

export const config = {
  runtime: 'experimental-edge',
};

type SongType = {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    external_urls: {
      spotify: string;
    };
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
  };
};

export const getNowPlaying = async () => {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  return response;
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') return response.status(401).json({ message: 'INVALID_METHOD' });

  const nowPlaying = await getNowPlaying();

  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: nowPlaying.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const song: SongType = await nowPlaying.json();

  if (song?.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const data = {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map(_artist => _artist.name).join(', '),
    album: song.item.album.name,
    albumImageUrl: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify,
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
