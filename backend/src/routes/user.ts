import { Router } from 'express'
import userController from '../controllers/userController'

const userRouter = Router()

userRouter.get('/', userController.usersGet)
userRouter.post('/sign-up', userController.usersPost)

export default userRouter
