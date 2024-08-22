import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const workoutId = parseInt(req.query.id as string, 10);
  const { type, duration, intensity } = req.body;

  try {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        type,
        duration,
        intensity,
      },
    });

    res
      .status(200)
      .json({ message: 'Workout updated successfully', updatedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update workout' });
  }
}