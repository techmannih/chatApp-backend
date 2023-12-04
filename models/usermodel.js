const mongoose = require('mongoose')

// schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    userId: {
        type: String,
        required:true,
    },
    profilePicUrl: {
        type: String,
        default: "default_image_url",
        required:true,
    },
},
    {
        timestamps: true,
    })
const UserModel = mongoose.model("User", userSchema)

module.exports = { UserModel };