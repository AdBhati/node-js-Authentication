import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017", { dbName: "auth-demo-db" })
        console.log("DB connected!!!")
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;