import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const goalId = parseInt(req.query.id as string, 10);
  const { type, target, deadline } = req.body;

  try {
    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        type,
        target,
        deadline,
      },
    });

    res.status(200).json({ message: 'Goal updated successfully', updatedGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update goal' });
  }
}