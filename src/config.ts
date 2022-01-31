import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

configDotenv({
  path: resolve(__dirname, '../.env')
})

switch (process.env.NODE_ENV) {
  case 'development':
    configDotenv({
      path: resolve(__dirname, '../.env.development')
    })
    break
  case 'production':
    configDotenv({
      path: resolve(__dirname, '../.env.production')
    })
    break
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}
