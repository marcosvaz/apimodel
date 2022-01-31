import './config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application
  public DATABASE_URL = process.env.DATABASE_URL

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect(this.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes (): void {
    this.express.set('base', '/v1')
    this.express.use('/v1', routes)
  }
}

export default new App().express
