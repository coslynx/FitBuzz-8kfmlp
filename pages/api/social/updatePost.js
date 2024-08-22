import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const postId = parseInt(req.query.id as string, 10);
  const { content } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content,
      },
    });

    res
      .status(200)
      .json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
}