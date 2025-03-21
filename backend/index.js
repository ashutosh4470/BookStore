import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from "./routes/BookRoutes.js";
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.mongoDBURL;

const app = express();
app.use(cors());

//Middleware for parsing request Body.
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(222).send("Welcome to MERN Project");
})

app.use('/books',router);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("DB Connect successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error:", error);
    });
