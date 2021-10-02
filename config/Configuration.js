/* eslint-disable no-empty */
import mongoose from 'mongoose'

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.CONNECT_STRING ,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false})
        console.log('Successfully connected to database')
    }catch(error) {
        console.log('Unable to connect to database ', error)
        process.exit()
    }
}

const portConnection = (app) => {
    app.listen(process.env.PORT,() => {
        console.log('Server up and running on port', process.env.PORT )
    })
}

export default {
    dbConnection,
    portConnection
}