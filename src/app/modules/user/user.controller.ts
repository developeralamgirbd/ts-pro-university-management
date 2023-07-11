import { RequestHandler } from 'express';
import { userService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { role, password } = req.body;
    const user = { role, password };
    const result = await userService.createUser(user);

    res.status(201).json({
      status: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
};
