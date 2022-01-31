import { Response } from 'express'

import ApplicationError from './error'

type validationType = { path: string, fields: { [field: string]: string } }

class Validation {
  public async fields (res: Response, { path, fields }: validationType) {
    const validation = []

    Object.entries(fields).forEach(field => {
      if (field[1] === undefined) validation.push(field[0])
    })

    if(validation.length > 0) ApplicationError.throw(res, { type: 400, code: path + '/required-fields', message: `Os campos [${validation.toString().replace(/,/g, ', ')}] são obrigatórios.` })
  }
}

export default new Validation()
