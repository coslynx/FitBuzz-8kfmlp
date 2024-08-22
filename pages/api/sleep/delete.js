import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const sleepEntryId = parseInt(req.query.id as string, 10);

  try {
    const sleepEntry = await prisma.sleep.delete({
      where: {
        id: sleepEntryId,
      },
    });

    res
      .status(200)
      .json({ message: "Sleep entry deleted successfully", sleepEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete sleep entry" });
  }
}