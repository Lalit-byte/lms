//  npm install express nodemon dotenv cors cloudinary mongoose 
// multer stripe svix@1.42.0 @clerk/express

import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

//initalizing express app 
const app = express();

//connecting to database
await connectDB();

//middlewares   
app.use(cors());

//routes
app.get("/", (req, res) => {
    res.send("API Working");
});
app.post('/clerk', express.json(), clerkWebhooks)

//port
const PORT = process.env.PORT || 5000;

//starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});