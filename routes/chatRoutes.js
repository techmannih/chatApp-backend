const {Router} =require('express')
const {createChats,deleteChats,addNewMessage,deleteMessage,editMessage,getAllChats}=require("../controller/chatsController")

const router =Router();
//chats

router.route("/chats").get(getAllChats);
router.route("/chats/create").post(createChats);
router.route("/chats/delete/:chatId").delete(deleteChats);
router.route("/chats/message/new").put(addNewMessage);
router.route("/chats/message/delete").delete(deleteMessage);
router.route("/chats/message/update").put(editMessage);

module.exports= router;