import { Admin } from 'db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import {connectToDatabase} from 'db/src/db.Connect'


const SECRET = 'SECRET'


type Data = {
  token?: string;
  message?: string;
  name?: string;

}

const adminInputs = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    
    await connectToDatabase();
    const { username, password } = adminInputs.parse(req.body);

    const admin = await Admin.findOne({ username });

    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();

      const token = jwt.sign({ id: newAdmin._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Invalid input' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
