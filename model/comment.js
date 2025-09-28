const mongoose=require('mongoose')

const commentScheema=mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addBlog",
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    blogTitle:{
        type:String,
        required:true
    }
},{
    timestamps: true  // 👉 This adds createdAt and updatedAt automatically
})

const comment=mongoose.model("comment",commentScheema)
module.exports=comment