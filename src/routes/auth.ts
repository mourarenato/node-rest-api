import { Router } from 'express';
import {
  signup,
  signin,
  profile,
  deleteUser
} from '../controllers/auth.controller';
import { TokenValidation } from '../libs/verifyToken';
const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);
router.delete('/delete', TokenValidation, deleteUser);

export default router;
