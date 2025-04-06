import "@dotenvx/dotenvx/config"
import express, {Request, Response, NextFunction} from "express"
import {gameRouter} from "./src/routes/game"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response, next: NextFunction)=>{
    res.render("index", {title: "Home"})
})

app.use("/games", gameRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{console.log(`Server running at http://localhost:${PORT}/`)})
