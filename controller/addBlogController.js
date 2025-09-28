const { populate } = require('dotenv');
const addBlog=require('../model/addBlog')
const comment=require('../model/comment')
const profile=require('../model/profile')
const mongoose=require('mongoose')


async function addedBlog(req,res) {
     try{
          let {title, subTitle, description, category,createdAt}=req.body;
     let thumbnailImage=req.file ? req.file.path : null;
     const newBlog=new addBlog({
          user:req.user._id,
          thumbnailImage,
          title,
          subTitle,
          description,
          category,
          createdAt
     })

     await newBlog.save();
     res.status(200).json({message:"Blog created successfully"})
     }catch(err){
          return res.status(500).json({message:"Error while adding blog "+err})
     }
}

async function getBlog(req,res) {
     try{
          const userBlogs=await addBlog.find({})
     if(userBlogs.length===0){
          return res.status(500).json({message:"No blogs available"});
     }
     return res.status(200).json({userBlogs})
     }catch(err){
          
          return res.status(500).json({message:"Error during getting "+err})
     }
}


async function getBlogByUser(req,res) {
     console.log("---------------------------------------------------------------------------------------------------------vvvv")
     console.log(req.user?._id)
     try{
          const userBlogs=await addBlog.find({user:req.user?._id})
          //console.log(userBlogs)
     if(userBlogs.length===0){
          return res.status(500).json({message:"No blogs available"});
     }

     return res.status(200).json({userBlogs})
     }catch(err){
          
          return res.status(500).json({message:"Error during getting "+err})
     }
}

async function getBlogById(req,res) {
     try{
          const {id}=req.params;
          const blogById=await addBlog.findById(id).populate("user")
          if(!blogById){
               return res.status(500).json({message:"No such blog"})
          }
          console.log("blogById: "+blogById)
          const userProfile=await profile.findOne({user:blogById.user?._id})
          console.log("userProfile: "+userProfile)
          return res.status(200).json({blogById,userProfile})
          
        }catch{
          return res.status(500).json({message:"Error while fetching "+err})
     }
}

async function getBlogByUserToUser(req,res) {
     const {id}=req.params
     const objectId = new mongoose.Types.ObjectId(id);
     try{
          const getBlogByUserToUserResult=await addBlog.find({user:objectId})
          //console.log(getBlogByUserToUserResult)
          return res.status(200).json({getBlogByUserToUserResult})

     }catch(err){
          console.log(err)
          return res.status(500).json({message:"Error while fetching "+err})
     }
     
}

async function deleteBlog(req,res) {
     const {id}=req.params;
     try{
          const deleteResult=await addBlog.findByIdAndDelete(id)
          if(!deleteResult){
               return res.status(500).json({message:"Delete failed"})
          }

          await comment.deleteMany({blog: id});// it only deletes if comments available otherwise stay calm dont through any error
          return  res.status(200).json({message: "Blog and associated comments deleted successfully"});
     }catch(err){
          console.log(err)
          return res.status(500).json({message:"Error while fetching "+err})
     }

}
const BlogContoller={
     addedBlog,
     getBlogByUser,
     getBlogById,
     getBlog,
     getBlogByUserToUser,
     deleteBlog
}

module.exports=BlogContoller