const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const UserRoute=require('./routes/userRoute');
const AddBlog=require('./routes/addBlogRoute')
const commentRoute=require('./routes/commentRouter')
const profileRoute=require('./routes/profileRoute')
const path = require('path');
const cookieParser=require('cookie-parser')
app.use(cookieParser());

app.use(cors({
    origin: ["https://steady-biscochitos-61738e.netlify.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.json());
const port=process.env.PORT || 5001;

app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`)
})

app.use('/api',UserRoute)
app.use('/api',AddBlog)
app.use('/api',commentRoute)
app.use('/api',profileRoute)
mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("DB connected succesfully")
}).catch(err=>{
    console.log(err)
})