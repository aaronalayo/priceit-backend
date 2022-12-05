import Router from 'express';
import userController from '../controllers/user.controller.js';
import { Schemas, ValidateSchema } from '../middleware/validate.schema.js' 

const userRouter = Router()

userRouter.post('/signUp', ValidateSchema(Schemas.user.create), userController.create)
userRouter.get('/find/:userId', userController.find)
userRouter.get('/findAll/', userController.findAll)
userRouter.patch('/update/:userId', ValidateSchema(Schemas.user.update), userController.update)
userRouter.delete('/delete/:userId', userController.deleteUser)


export default userRouter;