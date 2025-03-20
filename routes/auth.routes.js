import {Router} from 'express';

const authRouter  = Router();

authRouter.post('/sign-up',(req,res)=>{
    {
        res.send('sinus')
    }
})
authRouter.post('/sign-in',(req,res)=>{
    {
        res.send('singing')
    }
})
authRouter.post('/sign-out',(req,res)=>{
    {
        res.send('snout')
    }
})

export  default  authRouter;