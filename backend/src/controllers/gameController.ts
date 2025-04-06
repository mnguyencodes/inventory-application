import queries from "../db/queries"
import asyncHandler from "express-async-handler"

const addGame = async(title: string, year: number)=>{
    await queries.addGame(title, year)
}

export default {
    addGame
}
