//  npm install express nodemon dotenv cors cloudinary mongoose 
// multer stripe svix@1.42.0 @clerk/express

import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js"; 
import { clerkMiddleware } from "@clerk/express"; 
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";  

//initalizing express app 
const app = express();

//connecting to database
await connectDB();
await connectCloudinary();

//middlewares   
app.use(cors());
app.use(clerkMiddleware())

//routes
app.get("/", (req, res) => {
    res.send("API Working");
});
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course ', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks )

//port
const PORT = process.env.PORT || 5000;

//starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});