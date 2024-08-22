import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, type, target, deadline } = req.body;

  try {
    const goal = await prisma.goal.create({
      data: {
        userId,
        type,
        target,
        deadline,
      },
    });

    res.status(201).json({ message: 'Goal created successfully', goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create goal' });
  }
}