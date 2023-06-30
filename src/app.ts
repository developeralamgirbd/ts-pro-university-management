import express, { Express, Request, Response } from 'express'
import cors from 'cors'
const app: Express = express()
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1', UserRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
  // throw new ApiError(400, 'Basic Error')
  // Promise.reject(new Error('Unhandle rejection error'))
  // console.log(x)
})

app.use(globalErrorHandler)
export default app
