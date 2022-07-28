// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}

export const server = {
  fetch: async (url: string) => {
    const response = await fetch(url, {
      method: 'GET'
    });

    return response.json() as Promise<{ results: Movie[] }>;
  }
};
