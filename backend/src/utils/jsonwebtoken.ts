import jwt from 'jsonwebtoken'

// use the following command to generate a 32-byte secret key
// openssl rand -hex 32

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

const authenticateUser = (user: User) => {
  try {
    const token = jwt.sign({ user }, process.env.SECRET as string, { expiresIn: '24h' })
    return token
  } catch (err) {
    console.error('Error generating token:', err)
    return null
  }
}

export default {
  authenticateUser,
}
