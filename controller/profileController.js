const profile=require('../model/profile')
const mongoose=require('mongoose')

async function addProfile(req,res) {
    const {userID, userName, profileDesciption}=req.body;
    const profileImage=req.file ? req.file.filename : null;
    const userIDExists = await profile.findOne({
        userID: userID,
        user: { $ne: req.user._id }//except current user, ne means not equal, it is useful while updating
        });
    if(userIDExists){
        return res.status(500).json({message:"UserID already used, please use another UserID"})
    }
    try{
        let existingProfile = await profile.findOne({ user:req.user._id });
    if (existingProfile) {
      // Update existing profile
      existingProfile.userName = userName;
      existingProfile.profileDesciption = profileDesciption;
      if (profileImage) existingProfile.profileImage = profileImage;
      await existingProfile.save();
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      // Create new profile
      const newProfile = new profile({
        user:req.user._id,
        userID,
        userName,
        profileImage,
        profileDesciption
      });
      await newProfile.save();
      return res.status(200).json({ message: "Profile created successfully" });
    }

    }catch(err){
        return res.status(500).json({message:"Error while upload profile "+err})
    }
}

async function getProfile(req,res) {
    console.log("userProfile:"+req.user)
    try{
        const getProfileResult=await profile.findOne({user:req.user._id})
        if(getProfileResult){
            return res.status(200).json({getProfileResult})
        }
    }catch(err){
        return res.status(500).json({message:"Failed to fetch profile "+err})
    }
}

async function getUsers(req,res) {
    try{
        const getUsersResult=await profile.find({})
        if(getUsersResult.length===0){
            console.log(getUsersResult)
            return res.status(500).json({message:"No users Available"})
        }
        return res.status(200).json({getUsersResult})
    }catch(err){
        return res.status(500).json({message:err})
    }
}

async function getProfileByUserToUser(req,res) {
    const {id}=req.params
    const objectId = new mongoose.Types.ObjectId(id);
    try{
        const getUsersResult=await profile.find({user:objectId})
        console.log(getUsersResult)
        
        return res.status(200).json({getUsersResult})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
}
const profileController={
    addProfile,
    getProfile,
    getUsers,
    getProfileByUserToUser
}
module.exports=profileController