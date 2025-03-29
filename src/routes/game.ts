import {Router} from "express"

export const gameRouter = Router()

gameRouter.get("/", (req, res, next)=>{
    res.render("game", {title: "Games"})
})

gameRouter.get("/add-game", (req, res, next)=>{
    res.render("addGame", {title: "Add Game"})
})

