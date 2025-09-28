const express=require('express');
const route=express.Router();
const middleware=require('../Middleware/middleware');
const { addComment, getComment, getCommentsByUser, deleteComment } = require('../controller/commentController');


route.post('/addComment/:id',middleware,addComment);
route.get('/getComment/:id',middleware,getComment);
route.get('/getCommentByUser',middleware,getCommentsByUser)
route.delete('/deleteComment/:id',middleware,deleteComment)

module.exports=route;