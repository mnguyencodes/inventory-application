import { Router } from 'express'
import gameController from '../controllers/gameController'

export const gameRouter = Router()

gameRouter.get('/', gameController.gamesGet)
