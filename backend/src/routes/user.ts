import { Router } from 'express'
import { corsUtil } from '../utils/cors'
import userController from '../controllers/userController'

const userRouter = Router()

userRouter.get('/', corsUtil, userController.usersGet)
userRouter.post('/create', corsUtil, userController.usersPost)

export default userRouter
