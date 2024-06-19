const Sequelize=require("sequelize");

const sequelize=new Sequelize("group_chat_app","root",'Mysql@1707',{
    dialect:"mysql",
    host:"localhost"
})

module.exports=sequelize;