import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// use the following command to generate a 32-byte secret key
// openssl rand -hex 32

const unauthorizedMessage = {
  message: 'Unauthorized: You need to be authenticated to access this page.',
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

interface UserPayload {
  user: User
}

interface RequestWithToken extends Request {
  token?: string
  user?: User
}

const createToken = (user: User) => {
  try {
    const token = jwt.sign({ user }, process.env.SECRET as string, { expiresIn: '24h' })
    return token
  } catch (err) {
    console.error('Error generating token:', err)
    return null
  }
}

export default {
  createToken,
}
