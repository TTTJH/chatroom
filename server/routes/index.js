var express = require('express');
var router = express.Router();
var md5 = require("js-md5");
const {SocketModel , UserModel} = require("../db/model");
var filter = {password : 0 , __v : 0};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register",function(req,res){
  const {username , password , playername} = req.body;

  UserModel.find({username},function(err,user){
    console.log(user);
    if(user != ""){
      //已经存在
      res.send({code : 0 , msg : "该用户已经存在"});
    }else{
      new UserModel({username , password : md5(password) , playername}).save(function(err , result){
        if(!err){
          const {username,_id,playername} = result;
          res.cookie("userid",_id,{maxAge:1000*60*60*24});
          const data = {username,_id,playername};
          res.send({code : 1 , data});
        }else{
          res.send({code : 0 , msg : "注册用户失败"});
        }
      })
    }
  })
})

router.post("/login",function(req,res){
  const {username , password} = req.body;
  UserModel.findOne({username,password : md5(password)},function(err,user){
    if(!user){
      res.send({code : 0 , msg : "用户名或密码错误"});
    }else{
      const {username,_id,playername} = user;
      res.cookie("userid",_id,{maxAge:1000*60*60*24});
      const data = {username,_id,playername};
      res.cookie("userid",user._id,{maxAge:1000*60*60*24});
      res.send({code : 1 , data});
    }
  })
})

router.get("/user",function(req,res){
  const _id = req.cookies.userid;
  UserModel.findOne({_id},filter,function(err , user){
    if(!user){
      res.clearCookie("userid");
    }else{
      res.send({code : 1 , data : user});
    }
  })
})

router.get("/msgList",function(req,res){
  SocketModel.find({},function(err,msgs){
    if(!err){
      res.send({code : 1 , data : msgs});
    }else{
      res.send({code : 0 , msg : "获取信息列表失败请重试"});
    }
  })
});


module.exports = router;
