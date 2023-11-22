const mongoose =require('mongoose')

// schema
const ChatSchema = new mongoose.Schema(
    {
      participantsId: {
        type: Array,
      },
     
      messages: {
        type: Array,
      },
      last_message: {
        type: String,
        default: ""
      },
    },
    {
      timestamps: true,
    }
  )
    
