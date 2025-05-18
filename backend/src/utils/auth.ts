// passport jwt strategy

import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt'
import pool from '../db/pool'
