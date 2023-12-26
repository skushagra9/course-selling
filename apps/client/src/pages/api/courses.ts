import { Course } from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db.Connect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectToDatabase();

  try {
    // Get the server session using getServerSession
    const session = await getServerSession(req, res, authOptions);

    // Check if the session exists
    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }

    // Access the userId from the session token
    const userId = session.token.sub;

    // Retrieve courses for the user based on userId
    const courses = await Course.find({ userId });

    // Return the list of courses in the response
    res.json({ courses });
  } catch (error) {
    // Handle errors, return a 500 status for internal server error
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
