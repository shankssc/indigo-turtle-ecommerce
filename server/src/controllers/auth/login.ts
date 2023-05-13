import express, { Request, Response } from 'express';

import { loginFieldSchema } from '../../validation/auth/loginSchema';

export const login = async (req: Request, res: Response) => {
  const fields = loginFieldSchema().safeParse(req.body);

  if (fields.success === false)
    return res.status(400).json({ errors: 'Wrong Login Schema' });

  if (req.isAuthenticated()) {
    return res.send(req.user);
  } else
    return res.status(400).json({ errors: 'Passport failed to authenticate.' });
};
