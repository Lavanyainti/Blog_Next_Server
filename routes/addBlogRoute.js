const express=require('express');
const route=express.Router();
const middleware=require('../Middleware/middleware');
const { addedBlog, getBlog, getBlogById, getBlogByUser, getBlogByUserToUser, deleteBlog } = require('../controller/addBlogController');
const multer=require('multer')
const path=require('path');
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('../Config/cloudinary')

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"blog-images",
        allowed_formats:["jpg","png","jpeg"]
    }
})

const upload=multer({storage});


route.post('/addBlog',middleware,upload.single('thumbnailImage'),addedBlog);
route.get('/getBlogByUser',middleware,getBlogByUser);
route.get('/getBlogById/:id',middleware,getBlogById)
route.get('/getBlog',getBlog)
route.get('/getBlogByUserToUser/:id',getBlogByUserToUser)
route.delete('/deleteBlog/:id',deleteBlog)
module.exports=route;