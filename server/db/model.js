const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/socket",{useNewUrlParser: true});

mongoose.connection.on("connected",() => {
    console.log("数据库连接成功:P");
})

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username : {type:String,required:true},
    password : {type:String,required:true},
    playername : {type:String,required:true},
})

let socketSchema = new Schema({
    from: {type: String, required: true}, // 用户名
    userid: {type: String, required: true}, // 用户类型: dashen/laoban
    header: {type: String}, // 头像名称
    content: {type: String, required: true},
    time: {type: String, required: true},
});

const SocketSchema = mongoose.model("chat",socketSchema);

const UserSchema = mongoose.model("user",userSchema);

exports.UserModel = UserSchema;

exports.SocketModel = SocketSchema;