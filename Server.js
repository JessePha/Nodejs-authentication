import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import middlewares from './src/middlewares/Middleware.js'
import Configuration from './config/Configuration.js'
import UserRoutes from './src/routes/User.route.js'


dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
// app.use(morgan('common'))

// routes
UserRoutes.routes(app)

// middlewares
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)


// connect to database
Configuration.dbConnection()
Configuration.portConnection(app)

export default app