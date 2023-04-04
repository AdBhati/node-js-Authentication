import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './route/userRoute.js'
import dbConnect from './utils/connectDB.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", userRoute)

const init = async () => {
    await dbConnect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

init();