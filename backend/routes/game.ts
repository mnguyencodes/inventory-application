import {Router} from "express"

export const gameRouter = Router()

gameRouter.get("/", (req, res, next)=>{
    res.render("game", {title: "Games"})
})
