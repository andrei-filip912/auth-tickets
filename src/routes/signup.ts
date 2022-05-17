import express, {Request,  Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/request-validation-errors';
import { User } from '../models/user';

import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),

    body('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 chars')
],
async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    
    const { email, password }= req.body;

    // Find or create process
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });   // building the user object
    await user.save();  //  saving to mongo db

    // generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 'asd');


    // store jwt in session
    // we redefine the session object, because the type definition file 
    // does not want to assume there is already an object on req.session
    req.session = {
        jwt: userJwt
    };


    res.status(201).send(user);
 });

export {router as signupRouter};