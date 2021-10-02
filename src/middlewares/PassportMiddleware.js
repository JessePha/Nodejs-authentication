import passport from 'passport'
import localPassport from 'passport-local'
import jwtPassport from 'passport-jwt'
import UserModel from '../models/User.model.js'
import HandleToken from '../functions/HandleToken.js'

const localStrategy = localPassport.Strategy
const jwtStrategy = jwtPassport.Strategy

const jwtS = () => {
  passport.use(
    new jwtStrategy(
      { jwtFromRequest: HandleToken.cookieExtractor, secretOrKey: process.env.SECRET_KEY },
      async (payload, done) => {
        try {
          const user = await UserModel.findById({ _id: payload.sub })
          if (user) return done(null, user)
          else return done(null, false)
        } catch (err) {
          done(err)
        }
      }
    )
  )
}

const localS = () => {
  passport.use(
    new localStrategy(async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
        if (!user) return done(null, false)
        user.comparePassword(password, done)
      } catch (err) {
        return done(err)
      }
    })
  )
}

export default {
  jwtS,
  localS,
}
