const mongoose =require('mongoose')

// schema
const ChatSchema = new mongoose.Schema(
    {
      chatId:{
        type:String,
      },
      participants: {
        type: Object,
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

  const ChatModel=mongoose.model("Chat",ChatSchema)

module.exports = { ChatModel };
    
