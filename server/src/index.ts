import express, { Request, Response } from 'express';
import session, { SessionOptions } from 'express-session';
import passport from 'passport';
import passportlocal from 'passport-local';
import { compare } from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';


import { getUser } from 'userService';

dotenv.config()

const app = express();
app.use(express.json());

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.API_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

const sessionOptions: SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  };
  
const LocalStrategy = passportlocal.Strategy;

app.use(session(sessionOptions));
  
app.use(cookieParser());
  
//Setting up Passport
app.use(passport.initialize());
app.use(passport.session());
