const mongoose = require('mongoose')

const connectDB = async() => {
    try {
           const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNNECTION SUCCESS : ${conn.connection.name}`.bgGreen.black)
    } catch (error) {
        console.log(`DB CONNECTION FAILED : ${error.message}`.bgRed.white)
    }
}

module.exports =  connectDB