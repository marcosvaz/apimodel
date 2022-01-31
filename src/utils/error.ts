import { Response } from 'express'

type errorResponseType = { type: number, code: string, message?: string }

class ApplicationError {
  public async throw (res: Response, { type, code, message }: errorResponseType) {
    res.status(type).json({ code, message })
  }
}

export default new ApplicationError()
