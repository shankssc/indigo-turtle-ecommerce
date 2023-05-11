// 3rd Party
import express from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// 1st Party
//import registrationRoute from '@/routes/registrationRoute';
import registrationRoute from '@/routes/registrationRoute';
import productsRoute from '@/routes/productsRouter';
import loginRoute from '@/routes/loginRoute';
import checkoutRoute from '@/routes/checkoutRoute';
import { strategy } from '@/middlewares/passport';
import stripeWebhookRoute from '@/routes/stripeWebhookRoute';
import envConfig from '@/config/envConfig';
import { maybeExclude } from './utils/maybeExclude';
import { onlyInclude } from './utils/maybeInclude';
import config from '@/config/envConfig';

const { CLIENT_URL } = envConfig;

const sessionOptions = {
  secret: 'BlogSecret',
  resave: false,
  saveUninitialized: false,
};

const app = express();
console.log(CLIENT_URL);

app.use(maybeExclude(express.json(), ['/api/stripeWebhook']) as any);
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use('/api/stripeWebhook', express.raw({ type: '*/*' }));
app.use(express.json());
app.use(cookieSession(sessionOptions));
app.use(cookieParser());

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

//routes
app.use('/api/register', registrationRoute);
app.use('/api/products', productsRoute);
app.use('/api/login', loginRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/stripeWebhook', stripeWebhookRoute);

export default app;
