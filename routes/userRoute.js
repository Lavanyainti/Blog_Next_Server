const express=require('express')
const route=express.Router();
const userController=require('../controller/userController')


route.post('/register',userController.registerUser);
route.post('/login',userController.loginUser)
route.delete('/removeUser',userController.logoutUser)
route.get('/checkExpiry',userController.isTokenExpired)
module.exports=route