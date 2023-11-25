const mongoose = require('mongoose')

// schema
const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
    },

    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
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
    },

},
    {
        timestamps: true,
    })
const UserModel = mongoose.model("User", userSchema)

module.exports = { UserModel };