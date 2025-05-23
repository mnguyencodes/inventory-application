import jwt from 'jsonwebtoken'

// use the following command to generate a 32-byte secret key
// openssl rand -hex 32

const unauthorizedMessage = {
  message: 'Unauthorized: You need to be authenticated to access this page.',
}

// const forbiddenMessage = {
//   message: 'Forbidden: You do not have the necessary permissions to access this page.',
// }

export interface JwtPayload {
  id: number
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

export default {
  createToken,
}
