import {Router} from "express"
import {corsUtil} from "../utils/cors"
import gameController from "../controllers/gameController"

export const gameRouter = Router()

gameRouter.get("/", corsUtil, async(req, res, next) => {
    const allGames = await gameController.gamesGet()
    res.json(allGames)
    return
})
