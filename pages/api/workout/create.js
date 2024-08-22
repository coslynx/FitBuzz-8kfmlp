import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, type, duration, intensity } = req.body;

  try {
    const workout = await prisma.workout.create({
      data: {
        userId,
        type,
        duration,
        intensity,
      },
    });

    res.status(201).json({ message: 'Workout created successfully', workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create workout' });
  }
}