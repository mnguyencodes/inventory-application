import queries, { Genre, Developer } from "../db/queries"
import asyncHandler from "express-async-handler"

const gamesPost = async(
    title: string, 
    year: number,
    genre: Genre[],
    developer: Developer[]
) => {
    await queries.gamesPost(title, year, genre, developer)
}

const gamesGet = (async() => {
    const allGames = await queries.gamesGet()
    return allGames
})

export default {
    gamesPost,
    gamesGet
}
