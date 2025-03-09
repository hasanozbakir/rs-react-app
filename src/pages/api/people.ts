import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { search = '', page = '1' } = req.query;

    const response = await fetch(`${BASE_URL}?search=${search}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
