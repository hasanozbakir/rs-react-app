import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '@/utils/constants';

const isValidId = (id: unknown): id is string => {
  return typeof id === 'string' && id.trim().length > 0;
};

const fetchPersonData = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch person with ID: ${id}`);
  }
  return response.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const data = await fetchPersonData(id);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}