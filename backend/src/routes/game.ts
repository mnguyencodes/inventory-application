import { Router } from 'express'
import gameController from '../controllers/gameController'

export const gameRouter = Router()

gameRouter.get('/', async (req, res, next) => {
  const allGames = await gameController.gamesGet()
  res.json(allGames)
  return
})
