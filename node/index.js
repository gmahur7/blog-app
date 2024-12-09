require('dotenv').config();
const express = require('express');
const cors = require('cors')

const connectDB = require('./config/DatabaseConnect');
connectDB();

const blogRoutes = require('./routers/BlogRoutes');

const app = express();
app.use(cors({
    origin:[process.env.CLIENT_URL,'http://localhost:5173'],
    credentials:true,
    methods:['GET','POST','PUT','DELETE','OPTIONS']
}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        success:true,
        message:"Hello world!"
    })
})

app.use('/api/blogs',blogRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server is running at "+process.env.PORT)
})