const {SocketModel} = require("../db/model");

var sd = require("silly-datetime");

module.exports = function (server){
    const io = require("socket.io")(server);

    io.on("connection",function(socket){
        console.log("有一个客户端连接了🤔");

        socket.on("clientSendMsg",function(data){
            console.log("服务端接受到来自客户端的消息了");
            console.log(data);
            const {from , userid , content } = data;
            const time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            new SocketModel({from,userid,content,time}).save(function(err , chat){
                if(!err){
                    io.sockets.emit("serverSendMsg",chat);
                }
            })
        })
    })

}