const mongoose =require('mongoose')

// schema
const userSchema =new mongoose.Schema({

fullname:  {
    type:String ,
},

username:  {
    type:String ,
},
email:  {
    type:String,
 },

userId:  {
    type:String,
 },

profilePic:  {
    
    type:String ,
     default:"https_adding_image",
 },
    
},
{
    timestamps:true,
})
const UserModel=mongoose.model("User",userSchema)

module.exports = { UserModel };