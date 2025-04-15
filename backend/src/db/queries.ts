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
    image: string,
    genre: Genre[], 
    developer: Developer[]) => 
{
    await pool.game.create({
        data: {
            title: title,
            year: year,
            image: image,
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
    const allGames = await pool.game.findMany({
        include: {
            genre: true,
            developer: true
        }
    })
    return allGames
})

export default {
    gamesPost,
    gamesGet
}
