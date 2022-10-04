import { NextApiRequest, NextApiResponse } from 'next';

const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? '';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'; // https://developer.spotify.com/console/get-users-currently-playing-track
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

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

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the access token.');
  }

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
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

  return response.status(200).json({ data });
}
