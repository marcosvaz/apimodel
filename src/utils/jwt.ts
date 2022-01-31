import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

class AuthToken {
  public verify (req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization

    if (!token) return res.status(400).send({ code: 'auth/no-token-provided', message: 'No token provided.' })

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }

    jwt.verify(token, process.env.SECRET, function (error, decoded) {
      if (error) return res.status(401).send({ code: 'auth/failed-to-authenticate', message: 'Failed to authenticate token.' })
      next()
    })
  }
}

export default new AuthToken()
