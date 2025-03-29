import {Router} from "express"

export const developerRouter = Router()

developerRouter.get("/", (req, res, next)=>{
    res.render("developer", {title: "Developers"})
})
