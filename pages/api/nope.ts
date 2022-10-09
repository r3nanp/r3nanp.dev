import { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  return res.status(400).json({ message: "Please don't" });
}
