import {Router} from "express"
import cors from "../utils/cors"

export const gameRouter = Router()

gameRouter.get("/", cors.corsOptionsDelegate, (req, res, next) => {
    res.send("You successfully created your first CORS enabled route for an allowed domain!!")
})
