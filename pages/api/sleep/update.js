import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sleepEntryId = parseInt(req.query.id as string, 10);
  const { duration, quality } = req.body;

  try {
    const updatedSleepEntry = await prisma.sleep.update({
      where: {
        id: sleepEntryId,
      },
      data: {
        duration,
        quality,
      },
    });

    res
      .status(200)
      .json({ message: 'Sleep entry updated successfully', updatedSleepEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update sleep entry' });
  }
}