import "@dotenvx/dotenvx/config"
import express from "express"
import {developerRouter} from "./routes/developer.ts"
import {gameRouter} from "./routes/game.ts"
import {genreRouter} from "./routes/genre.ts"

const app = express()
app.set("views", VIEWS_DIR)
app.set("view engine", "ejs")
app.use(express.static(PUBLIC_DIR))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res, next)=>{
    res.render("index", {title: "Home"})
})

app.use("/developers", developerRouter)
app.use("/games", gameRouter)
app.use("/genres", genreRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{console.log(`Server running at http://localhost:${PORT}/`)})
