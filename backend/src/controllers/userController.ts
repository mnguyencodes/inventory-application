import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import DuplicateEmailError from '../errors/duplicateEmailError'
import pool from '../db/pool'
import bcrypt from 'bcryptjs'

const usersPost = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body
  const duplicateEmail = await pool.user.findUnique({
    where: {
      email: email,
    },
  })
  if (duplicateEmail) {
    throw new DuplicateEmailError('Email already exists. Please use a different email.')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await pool.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  })
})

const usersGet = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await pool.user.findMany()
  res.send(allUsers)
})

export default {
  usersPost,
  usersGet,
}
