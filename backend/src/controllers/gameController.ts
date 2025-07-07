import { Request, Response } from 'express'
import queries, { Genre, Developer } from '../db/queries'
import asyncHandler from 'express-async-handler'
import pool from '../db/pool'

const gamesPost = async (
  title: string,
  year: number,
  genre: Genre[],
  developer: Developer[]
) => {
  await queries.gamesPost(title, year, genre, developer)
}

const gamesGet = asyncHandler(async (req: Request, res: Response) => {
  const allGames = await pool.game.findMany({
    include: {
      genre: true,
      developer: true,
    },
  })
  res.send({ allGames })
})

export default {
  gamesPost,
  gamesGet,
}
