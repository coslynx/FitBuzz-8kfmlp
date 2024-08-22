import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, duration, quality } = req.body;

  try {
    const sleepEntry = await prisma.sleep.create({
      data: {
        userId,
        duration,
        quality,
      },
    });

    res
      .status(201)
      .json({ message: 'Sleep entry created successfully', sleepEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create sleep entry' });
  }
}