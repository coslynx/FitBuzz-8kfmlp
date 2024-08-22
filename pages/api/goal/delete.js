import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const goalId = parseInt(req.query.id as string, 10);

  try {
    const goal = await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });

    res.status(200).json({ message: "Goal deleted successfully", goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete goal" });
  }
}