import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from './shared/logger'

const port = (config.port as string) || 8000
const boostrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info(`DB is connected successfully`)
    app.listen(port, () => {
      infoLogger.info(`app listening on port ${port}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    errorLogger.error(err.message)
  }
}

boostrap()
