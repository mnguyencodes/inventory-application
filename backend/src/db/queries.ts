import "@dotenvx/dotenvx/config"
import pool from "./pool"

export type Genre = {
    name: string
}

export type Developer = {
    name: string
}

const gamesPost = (async(
    title: string, 
    year: number, 
    genre: Genre[], 
    developer: Developer[]) => 
{
    await pool.game.create({
        data: {
            title: title,
            year: year,
            genre: {
                create: [
                    ...genre
                ],
            },
            developer: {
                create: [
                    ...developer
                ],
            },
        },
    })
})

const gamesGet = (async() => {
    const allGames = await pool.game.findMany()
    return allGames
})

export default {
    gamesPost,
    gamesGet
}
