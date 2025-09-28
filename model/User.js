const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userScheema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userScheema.pre('save', async function (next) {
    const user=this;
    if(!user.isModified){
        return next();
    }
    let salt=await bcrypt.genSalt(10);
    let hash=await bcrypt.hash(user.password,salt);
    user.password=hash;
    next();
})

userScheema.methods.comparePassword=async function(password){
        //Here, comparePassword is attached to userSchema.methods, meaning it is an instance method.
        // This means you can only call it on a specific user document (an instance of the model), not on the User model itself.
    return bcrypt.compare(password,this.password)
}
const User=mongoose.model("User",userScheema);
module.exports=User;
