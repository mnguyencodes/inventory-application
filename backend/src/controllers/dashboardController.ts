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
  // Fetch the user's real name from the database
  const user = await pool.user.findUnique({
    where: { id: req.user.id },
    select: { firstName: true },
  })

  if (!user) {
    res.status(404).json({ message: 'User not found.' })
    return
  }

  // Send back only the user's real name
  res.json({ firstName: user.firstName })
})

export default { dashboardGet }
