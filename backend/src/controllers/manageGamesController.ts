// Note: Even though the Manage Games link is not visible in the UI, it is still accessible via the URL.
// Thus, we need to ensure that the route is protected by JWT authentication.
// This will prevent unauthorized access to the manage games functionality.

import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import pool from '../db/pool'
import jwtAuth from '../utils/jwtAuth'

const manageGamesPost = [
  jwtAuth.authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const { title, year, genre, developer } = req.body
    const newGame = await pool.game.create({
      data: {
        title,
        year,
        genre: {
          // Use connectOrCreate to link existing genres or create new ones
          connectOrCreate: genre.map((g: string) => ({ name: g })),
        },
        developer: {
          // Use connectOrCreate to link existing developers or create new ones
          connectOrCreate: developer.map((d: string) => ({ name: d })),
        },
      },
    })
    res.status(201).json({
      message: 'Game created successfully',
      game: newGame,
    })
  }),
]

const manageGamesGet = asyncHandler(async (req: Request, res: Response) => {
  const games = await pool.game.findMany({
    include: {
      genre: true,
      developer: true,
    },
  })
})

export default { manageGamesPost, manageGamesGet }
