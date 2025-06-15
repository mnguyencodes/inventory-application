// Route for the dashboard
import { Router } from 'express'
import dashboardController from '../controllers/dashboardController'
import jwtAuth from '../utils/jwtAuth'

export const dashboardRouter = Router()

dashboardRouter.get('/', jwtAuth.authenticate, dashboardController.dashboardGet)

export default dashboardRouter
