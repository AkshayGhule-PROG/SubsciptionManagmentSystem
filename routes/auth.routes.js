import { Router } from 'express';
import { signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);

export default authRouter;
// api/auth/sign-in
// authRouter.post('/sign-in', signIn);

// api/auth/sign-out
// authRouter.post('/sign-out', signOut);

