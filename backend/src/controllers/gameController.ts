import queries, { Genre, Developer } from "../db/queries"
import asyncHandler from "express-async-handler"

const addGame = async(
    title: string, 
    year: number,
    genre: Genre[],
    developer: Developer[]
) => {
    await queries.addGame(title, year, genre, developer)
}

export default {
    addGame
}
