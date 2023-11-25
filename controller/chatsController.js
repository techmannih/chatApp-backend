
const { ChatModel } = require("../models/chatmodel")

// show all chats 
module.exports.getAllChats = async (req, res) => {
    try {
      const allChats = await ChatModel.find();        // Fetch all chats from the database
        res.status(200).json({ chats: allChats });// Respond with the retrieved chats
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// create chats
module.exports.createChats = async (req, res) => {
    try {
        const { chatId, senderId, reciverId } = req.body;
        const existingChat = await ChatModel.findOne({
            chatId,
            participants: { $all: [senderId, reciverId] }
        });
        if (existingChat) {
            await existingChat.save();
            return res.status(200).json({ success: true, chat: existingChat });
        } else {
            res.status(200).send({ status: "chats not found" });
        }
        // If a chat doesn't exist, create a new one
        const newChat = await ChatModel.create({
            chatId,
            participants: [senderId, reciverId],
        });
        await newChat.save();  // Save the new chat to the database
        res.status(201).json({ success: true, chat: newChat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
// delete the chats
module.exports.deleteChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const deletedChat = await ChatModel.findByIdAndDelete(chatId);// Use findByIdAndDelete to delete the chat

        if (deletedChat) {
            res.status(200).send({ status: true, message: 'Chat deleted successfully', chat: deletedChat });
        } else {
            res.status(404).send({ status: false, message: 'Chat not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};
// create new mesaage by chatId , messageId
module.exports.addNewMessage = async (req, res) => {
    try {
        const { chatId, messageId, message } = req.body;
        // Check if the required fields are provided
        if (!chatId || !messageId || !message) {
            return res.status(400).json({ success: false, message: 'Incomplete data provided' });
        }
        const chat = await ChatModel.findOne({ chatId });
        // Check if the chat exists
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }
        // Add the new message to the chat
        const newMessage = {
            messageId,
            message,
            timestamp: new Date(),
        };
        chat.messages.push(newMessage);
        const updatedChat = await chat.save(); // Save the updated chat with the new message
        res.status(200).json({ success: true, chat: updatedChat, newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
// update message by use of chatId and messageId
module.exports.updateMessage = async (req, res) => {
    try {
        const { chatId, messageId, updatedMessage } = req.body;
        if (!chatId || !messageId || !updatedMessage) {
            return res.status(400).json({ success: false, message: 'Incomplete data provided' });
        }
        const updatedChat = await ChatModel.findOneAndUpdate(
            {
                chatId,
                'messages._id': messageId, // Use _id to identify the specific message
            },
            {
                $set: {
                    'messages.$.message': updatedMessage,
                },
            },
            { new: true }
        );
        // Check if the chat or the specific message exists
        if (!updatedChat) {
            return res.status(404).json({ success: false, message: 'Chat or message not found' });
        } else {
            res.status(200).json({ success: true, chat: updatedChat });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//delete message by use of chatId and messageId 
module.exports.editMessage = async (req, res) => {
    try {
        const { chatId, messageId } = req.body;
        if (!chatId || !messageId) {
            return res.status(400).json({ success: false, message: 'Incomplete data provided' });
        }
        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            {
                $pull: {
                    messages: { _id: messageId },
                },
            },
            { new: true }
        );
        // Check if the chat or the specific message exists
        if (!updatedChat) {
            return res.status(404).json({ success: false, message: 'Chat or message not found' });
        } else {
            res.status(200).json({ success: true, chat: updatedChat });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

