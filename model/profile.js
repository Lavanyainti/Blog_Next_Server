const mongoose=require('mongoose');


const ProfileScheema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:true
    },
    profileDesciption:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

const profile=mongoose.model("profile",ProfileScheema)
module.exports=profile;