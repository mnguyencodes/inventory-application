// Controller for handling dashboard-related requests
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import pool from '../db/pool'

interface RequestWithUser extends Request {
  user?: {
    id?: number
    firstName?: string
  }
}

const dashboardGet = asyncHandler(async (req: RequestWithUser, res: Response) => {
  // Check if the user is authenticated
  if (!req.user) {
    res.status(401).json({ message: 'Please log in to access this resource.' })
    return
  }
export default { dashboardGet }
