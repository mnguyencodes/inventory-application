import "@dotenvx/dotenvx/config"
import express from "express"
import {gameRouter} from "./src/routes/game"
import {corsUtil} from "./src/utils/cors"

const server = express()
server.use(express.urlencoded({extended: true}))
server.use(corsUtil)

server.get("/", (req, res, next)=>{
    res.send("Welcome to the homepage!")
})

server.use("/games", gameRouter)

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{console.log(`Server running at http://localhost:${PORT}/`)})
