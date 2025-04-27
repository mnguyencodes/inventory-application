// NOTE: This file may be unnecessary after all.
// The advantages of using an ORM like Prisma provides an intuitive query API that can be used within the controller itself.

import '@dotenvx/dotenvx/config'
import pool from './pool'

export type Genre = {
  name: string
}

export type Developer = {
  name: string
}

const gamesPost = async (
  title: string,
  year: number,
  image: string,
  genre: Genre[],
  developer: Developer[]
) => {
  await pool.game.create({
    data: {
      title: title,
      year: year,
      image: image,
      genre: {
        create: [...genre],
      },
      developer: {
        create: [...developer],
      },
    },
  })
}

const gamesGet = async () => {
  const allGames = await pool.game.findMany({
    include: {
      genre: true,
      developer: true,
    },
  })
  return allGames
}

const usersPost = async (firstName: string, lastName: string, email: string, password: string) => {
  await pool.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  })
}

const usersGet = async () => {
  const allUsers = await pool.user.findMany()
  return allUsers
}

export default {
  gamesPost,
  gamesGet,
  usersPost,
  usersGet,
}
