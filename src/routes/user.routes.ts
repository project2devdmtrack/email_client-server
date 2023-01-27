import { Router } from 'express';
// import { getAllUsers, signIn } from '../controllers/userController';
const db = require('./controllers/messageController');

const router = Router();

// router.post('/signin', signIn)
router.post('/createmessage', db.createMessage);
router.get('/getmessagesforuser', db.getMessagesForUser);

// router.post('/createuser', createUser);
// router.get('/getusers', getAllUsers);

export default router;
