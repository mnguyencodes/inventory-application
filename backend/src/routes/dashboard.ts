// Route for the dashboard
import { Router } from 'express'
import dashboardController from '../controllers/dashboardController'
import auth from '../utils/auth'

export const dashboardRouter = Router()

dashboardRouter.get('/', auth.authenticate, dashboardController.dashboardGet)

export default dashboardRouter
