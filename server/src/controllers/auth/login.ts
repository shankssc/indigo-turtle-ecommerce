import express, { Request, Response } from 'express';

import { loginFieldSchema } from '../../validation/auth/loginSchema';

export const login = async (req: Request, res: Response) => {
  // const fields = loginFieldSchema().safeParse(req.body);
  console.log(req.isAuthenticated());

  // if (req.isAuthenticated()) return res.send(req.user);
  return res.send('no');

  // if (fields.success === false)
  //   return res.status(400).json({ errors: fields.error.issues });

  // const data = {
  //   email: fields.data.email,
  //   password: fields.data.password,
  // };

  // TODO: send data to db using prisma & passport
};
