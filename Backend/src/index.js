import connectDB from "./db/index.js"
import dotenv from "dotenv"
import {app} from "./main.js"

dotenv.config({
    path: "/.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
    console.log(` Server is runing on port : ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("MONGODB connection failed !!! ",err)
})

