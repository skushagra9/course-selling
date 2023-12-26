import { Course } from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';
import { connectToDatabase } from '../../lib/db.Connect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    // Check if session.user is defined before accessing userId
    
    const userId = session.token.sub;

    const { title, description, price, imageLink, published } = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      price: z.number(),
      imageLink: z.string(),
      published: z.boolean(),
    }).parse(req.body);

    const course = new Course({ title, description, price, imageLink, published, userId });
    await course.save();
    res.json({ message: 'Course created successfully' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Invalid input', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
