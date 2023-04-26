import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

router.get('/', register);

export default router;