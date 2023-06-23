import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import userRoutes from './app/modules/users/users.route'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1', userRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
