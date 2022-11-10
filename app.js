import express from "express";
import mongoose from "mongoose"
import blogRoutes from "./routes/blogs-routes.js";
import userRoutes from "./routes/user-routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv' ;
dotenv.config()


const app = express()
// app.use(express.json())
// app.use("/api", (req, res , nxt)=>{
// res.send("hello world")
// })

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.gw7phba.mongodb.net/?retryWrites=true&w=majority")
.then(()=>app.listen( process.env.PORT || 5000) )
.then(() => console.log("Connected to the Db and Listening to d PORT 5000"))

.catch((err)=> console.log( err))

