import "dotenv/config"
import express from "express"
import {VIEWS_DIR, PUBLIC_DIR} from "./utils/utils.ts"

const app = express()
app.set("views", VIEWS_DIR)
app.set("view engine", "ejs")
app.use(express.static(PUBLIC_DIR))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res, next)=>{
    res.render("index", {title: "Home"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{console.log(`Server running at http://localhost:${PORT}/`)})
