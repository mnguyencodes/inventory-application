import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// use the following command to generate a 32-byte secret key
// openssl rand -hex 32

const unauthorizedMessage = {
  message: 'Unauthorized: You need to be authenticated to access this page.',
}

// May not be needed. Will delete at a later time.
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
    const token = bearerHeader.split(' ')[1]
    const decoded = decodeToken(token)

    if (!decoded) {
      return res.status(401).json(unauthorizedMessage) // invalid token
    }

    req.token = token
    req.userId = decoded.id
    next()
  } else {
    res.status(401).json(unauthorizedMessage) // no token provided
  }
}

const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET as string) as UserPayload
  } catch (err) {
    console.error('Error decoding token:', err)
    return null
  }
}

export default {
  createToken,
  verifyToken,
  decodeToken,
}
