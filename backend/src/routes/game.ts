import {Router} from "express"
import {corsUtil} from "../utils/cors"

export const gameRouter = Router()

gameRouter.get("/", corsUtil, (req, res, next) => {
    res.send("You successfully created your first CORS enabled route for an allowed domain!!")
})
