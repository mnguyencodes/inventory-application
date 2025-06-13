// Route for the dashboard
import { Router } from 'express'
import dashboardController from '../controllers/dashboardController'

export const dashboardRouter = Router()

dashboardRouter.get('/', dashboardController.dashboardGet)

export default dashboardRouter
