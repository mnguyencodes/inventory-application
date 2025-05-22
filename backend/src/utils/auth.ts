// passport jwt strategy

import { RequestHandler } from 'express'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt'
import pool from '../db/pool'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET as string,
}

// Without wrapping passport.use() in a function, the app will only register the JWT strategy once.
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done) => {
    console.log('JWT Payload:', jwtPayload) // Log the JWT payload for testing purposes
    try {
      // Query the database to find the user by ID
      const user = await pool.user.findUnique({
        where: { id: jwtPayload.id },
      })
      if (user) {
        console.log('User found:', user) // Log the user for testing purposes
        return done(null, user) // Pass the user to the next middleware
      } else {
        console.log('User not found') // Log if the user is not found
        return done(null, false) // No user found
      }
    } catch (err) {
      return done(err, false) // Handle any errors
    }
  })
)

// Middleware to authenticate the user using the JWT strategy
const authenticate: RequestHandler = passport.authenticate('jwt', { session: false })

export default {
  authenticate,
}
