import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../schemas/User'
import Crypto from '../utils/crypto'

class AuthController {
  public async authenticate (req: Request, res: Response): Promise<Response> {
    try {
      const { _id, password } = await User.findOne({ email: req.body.email })

      if (await Crypto.compare(req.body.password, password)) {
        const token = jwt.sign({ _id }, process.env.SECRET, {
          expiresIn: 60 * 10
        })
        return res.json({ auth: true, accessToken: token })
      } else {
        return res.status(401).json({ auth: false, error: 'auth/invalid-credentials' })
      }
    } catch (error) {
      return res.status(400).json({ auth: false, error: 'auth/invalid-credentials' })
    }
  }
}

export default new AuthController()
