import { Document } from 'mongoose'

export interface IUser extends Document {
  'email': string
  'info': {
    'createdAt': string
    'lastAccessAt': string
    'profileImage'?: string
  }
  'name': {
    'full': string
    'social': string
  }
  'password': string
}