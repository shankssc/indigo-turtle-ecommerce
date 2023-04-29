import express from 'express';
import { login } from '../controllers/auth/login';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('local'), login);

export default router;
