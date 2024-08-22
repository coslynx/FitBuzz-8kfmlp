import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const workoutId = parseInt(req.query.id as string, 10);

  try {
    const workout = await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });

    res.status(200).json({ message: "Workout deleted successfully", workout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete workout" });
  }
}