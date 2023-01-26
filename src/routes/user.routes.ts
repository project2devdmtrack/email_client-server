import { Router } from 'express';
import { getAllUsers, signIn } from '../controllers/userController';
import {
    createMessage,
    getAllMessages,
} from '../controllers/messageController';

const router = Router();

router.post('/signin', signIn);

router.post('/createmessage', createMessage);
router.get('/getmessages', getAllMessages);

// router.post('/createuser', createUser);
// router.get('/getusers', getAllUsers);

export default router;
