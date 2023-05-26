import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/user.model';
import { IUser } from '../types';

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, 'express', {
    expiresIn: '7d',
  });
  return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      (
        await existingUser
      ).password,
    );

    if (isPasswordIdentical) {
      const token = getUserToken((await existingUser)._id);
      return res.status(200).json({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
