import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import DuplicateEmailError from '../errors/duplicateEmailError'
import pool from '../db/pool'
import bcrypt from 'bcryptjs'
import jsonwebtoken from '../utils/jsonwebtoken'

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

  const newUser = await pool.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  })
  res.status(201).json({
    message: 'User created successfully',
  })
})

const usersGet = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await pool.user.findMany()
  res.send(allUsers)
})

const usersLogIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await pool.user.findUnique({
    where: {
      email: email,
    },
  })
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }

  res.status(200).json({ message: 'Login successful' })
})

export default {
  usersPost,
  usersGet,
  usersLogIn,
}

// Testing Purposes Email Account
// Email: testp@testp.com
// Password: Test123$
