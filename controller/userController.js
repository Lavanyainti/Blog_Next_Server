const User=require('../model/User');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRETKEY=process.env.JWT_SECRETKEY;

async function registerUser(req,res) {
    let {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(500).json({message:"User already existed.!"})
        }

        const newUser=new User({email,password});
        const result=await newUser.save();
        if(result){
           return res.status(200).json({message:"User registered succesfully",newUser});
        }

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Error During registration "+err.message})
    }
}

async function loginUser(req,res) {
    try{
        let {email,password}=req.body;
        const userLogin=await User.findOne({email});
        if(!userLogin){
            return res.status(500).json({message:"User not found"})
        }
        const isVlidPassword=await userLogin.comparePassword(password);
            // userLogin is the result of await User.findOne({ email }).

            // userLogin is a document (an instance of the User model).

            // That document has the comparePassword method available because it’s part of the schema’s methods.
        if(!isVlidPassword){
            return res.status(400).json({message:"Password must be same"});
        }
        console.log(isVlidPassword)
        let payload={id:userLogin._id}
        console.log("payload",payload)
        console.log(JWT_SECRETKEY)

        let token=jwt.sign(payload,JWT_SECRETKEY,{expiresIn:"1hr"});
        
        
        let finalData={
            id:userLogin._id,
            email:userLogin.email,
        }
        console.log(finalData)

        return res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none", // CSRF protection
            maxAge: 60 * 60 * 1000
        }).status(200).json({message:"Login success", data:finalData})
    }catch(err){
        return res.status(500).json({message:"Error during login "+err})
    }
}

async function logoutUser(req,res) {
    res.clearCookie("token",{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }).status(200).json({message:"User logout successfully"})
}

async function isTokenExpired(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.status(400).json({message:"token is not available, please login to get token."})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRETKEY)
    return res.status(200).json({message:"Valid token"});
    }catch (err) {
        console.log(err)
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}


const AuthController={
    registerUser,
    loginUser,
    logoutUser,
    isTokenExpired
}
module.exports=AuthController;