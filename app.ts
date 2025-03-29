import "dotenv/config"
import express from "express"
import {VIEWS_DIR, PUBLIC_DIR, DIST_DIR} from "./src/utils/utils"
import {developerRouter} from "./src/routes/developer"
import {gameRouter} from "./src/routes/game"
import {genreRouter} from "./src/routes/genre"

const app = express()
app.set("views", VIEWS_DIR)
app.set("view engine", "ejs")
app.use(express.static(DIST_DIR))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res, next)=>{
    res.render("index", {title: "Home"})
})

app.use("/developers", developerRouter)
app.use("/games", gameRouter)
app.use("/genres", genreRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{console.log(`Server running at http://localhost:${PORT}/`)})
