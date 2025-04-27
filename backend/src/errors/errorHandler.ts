import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode: number
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({ errors: err.message })
}

export { errorHandler }
