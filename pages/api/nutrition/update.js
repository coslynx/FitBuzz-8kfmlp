import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const nutritionEntryId = parseInt(req.query.id as string, 10);
  const { mealType, calories, macros } = req.body;

  try {
    const updatedNutritionEntry = await prisma.nutrition.update({
      where: {
        id: nutritionEntryId,
      },
      data: {
        mealType,
        calories,
        macros,
      },
    });

    res
      .status(200)
      .json({ message: 'Nutrition entry updated successfully', updatedNutritionEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update nutrition entry' });
  }
}