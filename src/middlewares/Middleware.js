import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

const notFound = (req, res, next) => {
  const error = new Error(`Not found! ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statuscode)
  res.json({
    statuscode: statuscode,
    message: error.message,
    stacktrace:
      process.env.ENVIROMENT === 'PRODUCTION' ? undefined : error.stacktrace,
  })
}

const hashAndEncryptedPassword = (UserSchema) => {
  const saltRounds = 10
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
      const hash = await bcrypt.hash(this.password, saltRounds)
      this.password = hash
      next()
    } catch (err) {
      return next(err)
    }
  })
}

const validatePassword = (UserSchema) => {
  UserSchema.methods.comparePassword = async function (password, callback) {
    try {
      const isValid = bcrypt.compare(password, this.password)
      if (!isValid) return callback(null, isValid)
      return callback(null, this)
    } catch (err) {
      return callback(err)
    }
  }
}

export default {
  notFound,
  errorHandler,
  hashAndEncryptedPassword,
  validatePassword
}
