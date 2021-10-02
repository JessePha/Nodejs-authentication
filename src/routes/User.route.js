import passport from 'passport'
import UserController from '../controllers/User.Controller.js'
import Middleware from '../middlewares/PassportMiddleware.js'

Middleware.jwtS()
Middleware.localS()

const routes = (app) => {
    app.post('/register', UserController.createUser)
    app.post('/login', passport.authenticate('local', {session: false}), UserController.loginUser)
    app.get('/logout', passport.authenticate('jwt', {session: false}), UserController.logoutUser)
    app.get('/authenticated', passport.authenticate('jwt', {session: false}), UserController.authenticated)
    app.put('/update', passport.authenticate('jwt', {session: false}), UserController.updateUser)
    app.get('/user', UserController.getAllUsers)
    app.get('/user/:userId', UserController.findUser)
    app.get('/searchuser', UserController.getUserWithUsernameQuery)
    app.delete('/user/:userId', UserController.deleteUser)
}

export default {
    routes
}