import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = parseInt(req.query.userId as string, 10);

  try {
    const nutritionEntries = await prisma.nutrition.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(nutritionEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch nutrition entries' });
  }
}