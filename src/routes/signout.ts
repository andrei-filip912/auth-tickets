import express from 'express';

const router = express.Router();

router.post('/api/users/signout',  (req, res) => {

    res.send('Hello there xx')
 });

export {router as signoutRouter};