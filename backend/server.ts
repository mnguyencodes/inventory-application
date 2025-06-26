import '@dotenvx/dotenvx/config'
import express from 'express'
import { gameRouter } from './src/routes/game'
import userRouter from './src/routes/user'
import dashboardRouter from './src/routes/dashboard'
import { corsUtil } from './src/utils/cors'
import { errorHandler } from './src/errors/errorHandler'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(corsUtil) // Enable CORS for all routes

server.get('/', (req, res, next) => {
  res.send('Welcome to the homepage!')
})

server.use('/games', gameRouter)
server.use('/users', userRouter)

server.use(errorHandler)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
