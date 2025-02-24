import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import mongodb from 'mongodb';
import userRouter from './routes/userRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import ticketRouter from './routes/ticketRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));

app.use("/auth", authRouter);
app.use('/user', userRouter);
app.use("/event", eventRouter);
app.use("/review", reviewRouter);
app.use("/ticket", ticketRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});