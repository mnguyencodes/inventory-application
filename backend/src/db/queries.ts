import "@dotenvx/dotenvx/config"
import pool from "./pool"

type Genre = {
    name: string
}

type Developer = {
    name: string
}

const addGame = (async(
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

export default {
    addGame,
}
