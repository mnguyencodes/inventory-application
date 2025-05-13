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
  id: number
}

interface RequestWithToken extends Request {
  token?: string
  userId?: number
}

const createToken = (userId: number) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.SECRET as string, {
      expiresIn: '24h',
    })
    return token
  } catch (err) {
    console.error('Error generating token:', err)
    return null
  }
}

const verifyToken = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    req.token = token
    next()
  } else {
    res.status(401).json(unauthorizedMessage)
  }
}

export default {
  createToken,
  verifyToken,
}
