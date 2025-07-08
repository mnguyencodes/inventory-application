// Note: Even though the Manage Games link is not visible in the UI, it is still accessible via the URL.
// Thus, we need to ensure that the route is protected by JWT authentication.
// This will prevent unauthorized access to the manage games functionality.

import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import pool from '../db/pool'
import jwtAuth from '../utils/jwtAuth'
