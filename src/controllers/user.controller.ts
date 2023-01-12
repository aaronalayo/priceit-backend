import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const userFound = await User.findOne({ email: req.body.email, user_name: req.body.user_name });
  console.log(userFound);
  if (userFound) {
    res.status(302).send('User already in the system');
  } else if (!userFound) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      repeat_password: req.body.repeat_password,
    });
    return user
      .save()
      .then((user) => res.status(201).send('Success, user created'))
      .catch((error) => res.status(500).send('There was an internal problem. Try again'));
  }
};
const find = async (req: Request, res: Response) => {
  const userId: string = req.body.userId;

  return User.findById(userId)
    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const findAll = async (req: Request, res: Response) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};
const update = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(200).json({ user }))
          .catch((error) => res.status(501).json({ error }));
      } else {
        return res.status(404).json({ message: 'User not found ...' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user ? res.status(204).json({ user, message: 'User deleted' }) : res.status(404).json({ message: 'User not found ...' }),
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { create, find, findAll, update, deleteUser };
