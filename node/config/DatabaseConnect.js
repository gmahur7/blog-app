const mongoose= require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("error in connect db: ",error)
        process.exit(1);
    }
}

module.exports = connectDB;