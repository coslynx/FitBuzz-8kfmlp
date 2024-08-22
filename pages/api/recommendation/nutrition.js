import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, mealType, calories, macros } = req.body;

  try {
    const nutritionEntry = await prisma.nutrition.create({
      data: {
        userId,
        mealType,
        calories,
        macros,
      },
    });

    res
      .status(201)
      .json({ message: 'Nutrition entry created successfully', nutritionEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create nutrition entry' });
  }
}