import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode: number
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  console.error(err) // Log the error for debugging
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}

export { errorHandler }
