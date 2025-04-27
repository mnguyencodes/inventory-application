import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import DuplicateEmailError from '../errors/duplicateEmailError'
import pool from '../db/pool'

const usersPost = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body
  const duplicateEmail = await pool.user.findUnique({
    where: {
      email: email,
    },
  })
  if (duplicateEmail) {
    throw new DuplicateEmailError('Email already exists. Please use a different email.')
    // This code block is tested to be working.
    // CURL output:
    // {"errors":"Email already exists. Please use a different email."}
  }
  res.send("The email doesn't already exist!")
  // Successfully reach this point if email does not exist.

  // Curl command for quick POST testing:
  // curl -X POST -H "Content-Type: application/json" -d '{"firstName": "James", "lastName": "Bond", "email": "jb007@m16.com", "password": "JustAQuickTest7#"}' http://localhost:3000/users/create

  // JustAQuickTest7#

  await pool.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  })
  // res.redirect('/')
  // After some more research, it's best to redirect the user directly on the React app itself.
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
