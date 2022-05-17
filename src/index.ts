import express from 'express';
require('express-async-errors');    // required for handling async error,  without this request gets stuck in loop
import { errorHandler } from './middlewares/error-handler';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';


const app = express();
app.set('trust proxy', true);   // add to trust the nginx proxy
app.use(express.json());
app.use(
    cookieSession({
    signed: false,  // disable encryption
    secure: true    // allow https
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// throw exception for all path unmatched requests
app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler)

const dbConnect = async ()  => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, ()  => {
        console.log('Listening to 3000 !!!!!');
    });
}

dbConnect();