import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import DuplicateEmailError from '../errors/duplicateEmailError'
import pool from '../db/pool'

const usersPost = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body.email
  const duplicateEmail = await pool.user.findUnique({
    where: {
      email: email,
    },
  })
  if (duplicateEmail) {
    // Throw error
    throw new DuplicateEmailError('Email already exists. Please use a different email.')
  }
  // If we reach this point then we can go ahead and create the new user!
  res.send("The email doesn't already exist!")

  // Curl command for quick POST testing:
  // curl -X POST -H 'Content-Type:application/json' -d '{"firstName": "James", "lastName": "Bond", "email": "jb007@m16.com", "password": "JustAQuickTest7#"}' http://localhost:3000/users/create

  // JustAQuickTest7#

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

const usersGet = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await pool.user.findMany()
  res.send(allUsers)
})

export default {
  usersPost,
  usersGet,
}
