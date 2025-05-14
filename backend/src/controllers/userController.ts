import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import DuplicateEmailError from '../errors/duplicateEmailError'
import pool from '../db/pool'
import bcrypt from 'bcryptjs'
import jwt, { RequestWithToken } from '../utils/jwt'

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
  const token = jwt.createToken(newUser.id)
  console.log('Token: ', token)

  // Token successfully generated
  // Example token:

  // Token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMSwiZmlyc3ROYW1lIjoiUXVpY2tUZXN0Rmlyc3QiLCJsYXN0TmFtZSI6IlF1aWNrVGVzdExhc3QiLCJlbWFpbCI6InFxQHF0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGtlSHBMcXhIZ1hiWE1BdklRTTh6Zy5abDhubVhnQ3dOaVdhM2pScUd3d0puekdVVHdWdnFhIn0sImlhdCI6MTc0Njk2ODUyMiwiZXhwIjoxNzQ3MDU0OTIyfQ.QkHIDe5F0vW1eQHcVrDpMA_l9ureTBS3JtMsPK298Ss

  res.status(201).json({
    message: 'User created successfully',
    token,
  })
})

const usersGet = asyncHandler(async (req: RequestWithToken, res: Response) => {
  const allUsers = await pool.user.findMany()

  // Test if the token is working
  res.send({ allUsers, userId: req.userId, token: req.token })
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
