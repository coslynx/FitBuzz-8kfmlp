import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = parseInt(req.query.id as string, 10);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        goals: true,
        workouts: true,
        nutrition: true,
        sleep: true,
        posts: true,
        following: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        followers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
}