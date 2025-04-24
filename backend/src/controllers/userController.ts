import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import pool from '../db/pool'

const usersPost = asyncHandler(async (req: Request, res: Response) => {
  // Need to update database schema to ensure that the @unique constraint is added to email column
  const { email } = req.body.email
  const duplicateEmail = await pool.user.findUnique({
    where: {
      email: email,
    },
  })
  if (duplicateEmail) {
    // Throw error
  }
  //   const newUser = await pool.user.create({
  //     data: {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //     },
  //   })
})

//   const newUser = await pool.usersPost(firstName, lastName, email, password)

// Let's start off by checking if the email exists in the database.
// Prisma Docs:

// By unique identifier
// const user = await prisma.user.findUnique({
//     where: {
//       email: 'elsa@prisma.io',
//     },
//   })
