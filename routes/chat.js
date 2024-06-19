const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");
const chatController=require("../controller/chat");

router.get("/allcontacts",auth,chatController.getAllContacts);
 router.get("/allchats/:id",auth,chatController.getAllChats);
router.post("/chatmessage",auth,chatController.postChatMessage);

module.exports=router;