import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const nutritionEntryId = parseInt(req.query.id as string, 10);

  try {
    const nutritionEntry = await prisma.nutrition.delete({
      where: {
        id: nutritionEntryId,
      },
    });

    res
      .status(200)
      .json({ message: "Nutrition entry deleted successfully", nutritionEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete nutrition entry" });
  }
}