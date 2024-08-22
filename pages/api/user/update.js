import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = parseInt(req.query.id as string, 10);
  const { firstName, lastName, email, password } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user' });
  }
}