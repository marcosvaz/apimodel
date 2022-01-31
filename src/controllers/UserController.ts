import { Request, Response } from 'express'
import _ from 'lodash'

import User from '../schemas/User'
import Crypto from '../utils/crypto'
import ApplicationError from '../utils/error'

class UserController {
  public async list (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ $or: [{ 'email': req.body.email }] })
    if (user) ApplicationError.throw(res, { type: 400, code: 'users/user-already-exists', message: 'Usuário já cadastrado!' })
    else {
      try {
        req.body.password = await Crypto.encrypt(req.body.password)
        const createdUser = await User.create(req.body)

        return res.status(201).json(createdUser)
      } catch (error) {
        if (error.message.includes('required')) ApplicationError.throw(res, { type: 400, code: 'users/required-field-not-informed', message: error.message })
        else ApplicationError.throw(res, { type: 500, code: 'users/create-user', message: error.message })
      }
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { _id } = req.body

    try {
      const user = await User.findOne({ _id })
      const fieldsToUpdate = _.merge(user, req.body)
      const fieldsUpdated = await User.replaceOne({ _id }, fieldsToUpdate)

      if (fieldsUpdated.n === 0) throw new Error()

      return res.json(fieldsUpdated)
    } catch (error) {
      ApplicationError.throw(res, { type: 400, code: 'users/failed-to-update', message: 'Usuário não foi encontrado!' })
    }
  }
}

export default new UserController()
