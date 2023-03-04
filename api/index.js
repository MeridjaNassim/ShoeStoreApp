import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import fs from "fs"
import initDatabase from "./database/init.js"

//Import Routes
import authRouter from "./features/auth/auth.route.js"
import productRouter from "./features/product/product.route.js"
import cartRouter from "./features/cart/cart.route.js"
// Environment variables
dotenv.config({ path: "./config/.env" })

// Create app and connect to database
const app = express()

try{
    await initDatabase()
}catch(err) {
    console.error("Error connecting to database: ", err)
    process.exit(1)
}
// Middlewares
app.use(morgan('common', {
    stream: fs.createWriteStream('./log/common.log', {flags: 'a'})
}));

app.use(morgan('dev'));

app.use(cors())

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Routes

app.use("/auth",authRouter)
app.use("/products",productRouter)
app.use("/cart",cartRouter)


// Default Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})


// Server

app.listen(process.env.API_PORT,()=>{
    console.log(`Server running on port ${process.env.API_PORT}`)
})

