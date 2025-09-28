const commentModel=require('../model/comment')
const Blog=require('../model/addBlog')
const Profile=require('../model/profile')
async function addComment(req, res) {
    const { comment } = req.body;
    const { id } = req.params;

    console.log("💬 Incoming comment data:", { comment });
    console.log("🆔 Blog ID:", id);

    try {
        if (!comment || !id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const blog = await Blog.findById(id);//this get entire wblog with that id
        const profile=await Profile.findOne({user:req.user._id})
        const newComment = new commentModel({
            blog: id,
            comment,
            user:blog.user,//to get the user id from blog,
            commentUser:req.user._id,
            blogTitle:blog.title,
        });

        const result=await newComment.save();

        console.log("✅ Comment saved!");
        return res.status(200).json({ result });

    } catch (err) {
        console.error("❌ Error while saving comment:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

async function getComment(req,res) {
    const {id}=req.params
    console.log(id)
       try{
            const getCommentResult=await commentModel.find({blog:id})

            const commentResult=await Promise.all(
                getCommentResult.map(async (c)=>{
                    const profile=await Profile.findOne({user:c.commentUser}).select("userName profileImage")

                    return{
                        ...c.toObject(),//converting mongodb object to pure json object
                        userName: profile ? profile.userName : null,
                        profileImage: profile ? profile.profileImage : null
                    }
                })
            )
            console.log(getCommentResult)
            console.log(commentResult)
            return res.status(200).json({commentResult})
       } catch(err){
        console.log(err)
        return res.status(500).json({message:"Failed to fetch comments"})
       }
}

async function getCommentsByUser(req,res) {
    try{
        
        
        const getCommentsByUserResult=await commentModel.find({user:req.user._id})
        return res.status(200).json({getCommentsByUserResult});

    }catch(err){
        return res.status(500).json({message:"Error while getting "+err})
    }
}

async function deleteComment(req,res) {
    try{
        const {id}=req.params
        const deleteResult=await commentModel.deleteOne({_id:id})
        if(deleteResult){
            return res.status(200).json({message:"Delete succsessful"})
        }
    }catch(err){
        return res.status(500).json({message:"Error while deleting "+err})
    }
}

const commentController={
    addComment,
    getComment,
    getCommentsByUser,
    deleteComment
}
module.exports=commentController