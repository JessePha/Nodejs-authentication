import mongoose from 'mongoose'
import Middleware from '../middlewares/Middleware.js'

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    isVerified: Boolean
  },
  { timestamps: true, strict: true }
)

// Avoid storing passwords in plain text

Middleware.hashAndEncryptedPassword(UserSchema)
Middleware.validatePassword(UserSchema)

const UserModel = mongoose.model('user', UserSchema)

export default UserModel 