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
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
}