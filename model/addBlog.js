const mongoose=require('mongoose');

const  addBlogScheema=mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        thumbnailImage:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },subTitle:{
            type:String,
            required:true
        } ,
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        createdAt:{
            type:String,
            required:true
        }
})

const addBlog=mongoose.model("addBlog",addBlogScheema);
module.exports=addBlog;