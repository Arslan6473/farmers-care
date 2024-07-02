import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb" ,extended:true }))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import categoryRouter from "./routes/category.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import diseaseRouter from "./routes/disease.routes.js"
import pestRouter from "./routes/pest.routes.js"
import cropRouter from "./routes/crop.routes.js"


//routes decleration
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/categories" , categoryRouter)
app.use("/api/v1/products" , productRouter)
app.use("/api/v1/cart" , cartRouter)
app.use("/api/v1/orders" , orderRouter)
app.use("/api/v1/diseases" , diseaseRouter)
app.use("/api/v1/pests" , pestRouter)
app.use("/api/v1/crops" , cropRouter)




export {app}