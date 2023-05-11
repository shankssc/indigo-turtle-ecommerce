import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import prisma from '../prisma';
import { User } from '../types/auth';
import { NextFunction, Request, Response } from 'express';

export const strategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (targetEmail, targetPwd, done) => {
    const user = await prisma.user.findUnique({
      where: {
        email: targetEmail,
      },
    });

    if (!user) return done(null, false, { message: 'Error: No user found.' });

    const passwordsMatch = await bcrypt.compare(targetPwd, user.password);
    if (!passwordsMatch)
      return done(null, false, { message: 'Incorrect password.' });

    return done(null, user);
  }
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return done(null, false);
  done(null, user);
});

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401);
  return next();
};
