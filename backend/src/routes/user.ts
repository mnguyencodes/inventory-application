import { Router } from 'express'
import userController from '../controllers/userController'

const userRouter = Router()

userRouter.get('/', userController.usersGet)
userRouter.post('/sign-up', userController.usersPost)
userRouter.post('/log-in', userController.usersLogIn)

export default userRouter
