import { Router } from 'express'
import manageGamesController from '../controllers/manageGamesController'

const manageGamesRouter = Router()
manageGamesRouter.post('/', manageGamesController.manageGamesPost)
manageGamesRouter.get('/', manageGamesController.manageGamesGet)

export default manageGamesRouter
