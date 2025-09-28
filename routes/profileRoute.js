const express=require('express');
const route=express.Router();
const middleware=require('../Middleware/middleware')
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('../Config/cloudinary')
const path=require('path');
const { addProfile, getProfile, getUsers, getProfileByUserToUser } = require('../controller/profileController');

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"blog-profiles",
        allowed_formats:["jpg","png","jpeg"]
    }
})

const UploadProfileImage=multer({storage});

route.post('/addProfile',middleware,UploadProfileImage.single('profileImage'),addProfile);
route.get('/getProfile',middleware,getProfile)
route.get('/getUsers',getUsers)
route.get('/getProfileByUserToUser/:id',getProfileByUserToUser)

module.exports=route