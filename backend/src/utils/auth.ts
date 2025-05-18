// passport jwt strategy

import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt'
import pool from '../db/pool'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET as string,
}

const authenticate = () => {
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done) => {
      try {
        const user = await pool.user.findUnique({
          where: { id: jwtPayload.id },
        })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
