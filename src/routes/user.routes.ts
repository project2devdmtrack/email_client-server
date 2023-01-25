import { Router } from 'express';
import {
    createUser,
    getUserStatus,
    getAllUsers,
    deleteUser,
    signUp,
    signIn,
    toggleBlock,
    toggleUnblock,
} from '../controllers/userController';
const router = Router();

router.post('/createuser', createUser);
router.get('/getusers', getAllUsers);
router.get('/getuserstatus', getUserStatus);
router.delete('/deleteuser', deleteUser);

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/block', toggleBlock);
router.put('/unblock', toggleUnblock);

export default router;
