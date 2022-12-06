import Router from 'express';
import userController from '../controllers/userController.js';
import userAccess from '../controllers/userAccessController.js'
import { Schemas, ValidateSchema } from '../middleware/validate.schema.js' 

const userRouter = Router()

// User Access
userRouter.post('/login', userAccess.loginOne);
userRouter.post('/register', ValidateSchema(Schemas.user.create), userAccess.registerOne);

// CRUD
userRouter.post('/create', ValidateSchema(Schemas.user.create), userController.create)
userRouter.get('/find/:userId', userController.find)
userRouter.get('/findAll/', userController.findAll)
userRouter.patch('/update/:userId', ValidateSchema(Schemas.user.update), userController.update)
userRouter.delete('/delete/:userId', userController.deleteUser)


export default userRouter;