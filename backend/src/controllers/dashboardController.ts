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
})
export default { dashboardGet }
