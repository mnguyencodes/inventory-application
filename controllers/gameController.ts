import queries from "../db/queries"
import asyncHandler from "express-async-handler"

const addGame = asyncHandler(async(title, year)=>{
    await queries.addGame(title, year)
})

export default {
    addGame
}