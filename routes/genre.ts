import {Router} from "express"

export const genreRouter = Router()

genreRouter.get("/", (req, res, next)=>{
    res.render("genre", {title: "Genres"})
})
