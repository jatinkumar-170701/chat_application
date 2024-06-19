const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User");

function generateAccessToken(id,name){
  return jwt.sign({name:name,userId:id},"vishal");
}

function isstringinvalid(string){
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }
  }
exports.addUser=async(req,res)=>{
    console.log("req.body",req.body);
    try{
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const password=req.body.password;
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
            res.status(400).json({err:'bad parameter....something went wrong'})
        }
        let saltround=10;
        bcrypt.hash(password,saltround,async(err,hash)=>{
            await User.create({name,email,phone,password:hash});
        res.status(201).json({status:201, message:"successfully created new user"});
        })
        
    }
    catch(err){
        res.status(500).json({
            error:err
          })
    }
    
}

exports.login=async(req,res)=>{
try{
    console.log("in login",req.body);
const email=req.body.email;
const password=req.body.password;
if(isstringinvalid(email) || isstringinvalid(password)){
    res.status(400).json({err:'bad parameter....something went wrong'})
}

const user=await User.findAll({where:{email}});
 console.log("data from database user's",user[0].name);
if(user){
    bcrypt.compare(password,user[0].password,(err,result)=>{
      if(err){
        throw new Error("somethin went error");
      }
      if(result===true){
        res.status(200).json({status:200 ,success:"true",message:"user login successfully",token:generateAccessToken(user[0].id,user[0].name)})
      }
    })
  }

}
catch(err){
    console.log("Bad credentials");
}

}