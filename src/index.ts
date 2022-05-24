import mongoose from 'mongoose';
import { app } from './app';

const start = async ()  => {
    if(! process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, ()  => {
        console.log('Listening to 3000 !!!!!');
    });
}

start();