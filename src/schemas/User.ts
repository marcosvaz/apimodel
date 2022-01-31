import { Schema, model } from 'mongoose'

import { IUser } from '../interfaces'

const UserSchema = new Schema({
  email: { type: String, required: true },
  info: {
    createdAt: { type: String, required: true },
    lastAccessAt: { type: String, required: true },
    profileImage: { type: String, default: null }
  },
  name: {
    full: { type: String, required: true },
    social: { type: String, required: true }
  },
  password: { type: String, required: true },
})

export default model<IUser>('User', UserSchema)
