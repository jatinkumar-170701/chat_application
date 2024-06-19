const {Op}=require("sequelize");
const User=require("../models/User");
const Chat=require("../models/Chat");

exports.getAllContacts=async (req,res)=>{
    try{
        const user=await User.findAll({where:{id:{[Op.ne]:+req.user.id}},attributes:["id","name"]});
        res.status(200).json({success:true,user});
    }
    catch(err){
        res.status(500).json({success:false,message:Error});
    }
}

// try{

// }
// catch(err){
//     res.status(500).json({success:false,message:Error});
// }
exports.postChatMessage=async (req,res)=>{
    try{
        const chat=req.body.chat;
        const id=req.body.toUser;
        if(!chat){
            return res.status(400).json({message:'please enter the message'})
        }
        await req.user.createChat({chatMessage:chat,toUser:id});
        res.status(200).json({userName:req.user.name,message:"messages sent successfully"});
}
   catch(err){
    res.status(500).json({success:false,message:Error});
}
}

exports.getAllChats=async (req,res)=>{
    try{
        console.log(req.params);
        const chatPersonId= +req.params.id;
        if(chatPersonId==0){
            return res.status(200).json({message:"successfull"});

        }
        const chatTwoWay=await Chat.findAll({limit:10,order:[["updatedAt","DESC"]],where:{[Op.or]:[{toUser:chatPersonId,userId: +req.user.id},{toUser: +req.user.id,userId:chatPersonId}]},
    attributes:['chatMessage'],
    include:{model:User,where:{[Op.or]:[{id: +req.user.id},{id:chatPersonId}]},
    attributes:["name"]}});
    res.status(200).json({chats:chatTwoWay.reverse(),success:true});
}
catch(err){
    res.status(500).json({success:false,message:Error});
}
}