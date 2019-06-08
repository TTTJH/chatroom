import io from "socket.io-client";
import {
    LOG_REQ_ERROR,
    LOG_REQ_SUCCESS,
    MSGLIST_REQ_ERROR,
    MSGLSIT_REQ_SUCCESS,
    NEWMSG_RECEIVE,
}from "./action-types";

import {
    reqLogin,
    reqRegister,
    reqUser,
    reqMsgLsit,

}from "../api/index";



function initIO(dispatch){
    if(!io.socket){
        io.socket = io("ws://localhost:4000");
        io.socket.on("serverSendMsg",function(data){
                console.log("客户端接受到服务端的消息了:)");
                console.log("消息是");
                console.log(data);
                    dispatch(newmsg_receive_action(data));    
        })
    }
}

export function sendMsg_async_action (msg) {
    return dispatch => {
        io.socket.emit("clientSendMsg",msg);
    }
}

export const getMsgList_async_action = () => {
    return async dispatch => {
        const response = await reqMsgLsit();
        const result = response.data;
        if(result.code){
            dispatch(msglist_success_action(result.data));
        }else{
            dispatch(msglist_error_action(result.msg));
        }
    }
}



//同步action
const log_success_action = (data) => ({type:LOG_REQ_SUCCESS,data});

const log_error_action = (data) => ({type:LOG_REQ_ERROR,data});

const msglist_success_action = (data) => ({type:MSGLSIT_REQ_SUCCESS,data});

const msglist_error_action = (data) => ({type:MSGLIST_REQ_ERROR,data});

const newmsg_receive_action = (data) => ({type:NEWMSG_RECEIVE,data});

//异步action

export function register_async_action(data){
    return async dispatch => {
        initIO(dispatch);
        const result = await reqRegister(data);
        const response = result.data;

        if(response.code){
            dispatch(log_success_action(response.data));
        }else{
            dispatch(log_error_action(response.msg));
        }
    }
}

export function login_async_action(data){
    return async dispatch => {
        initIO(dispatch);
        const result = await reqLogin(data);
        const response = result.data;
        if(response.code){
            dispatch(log_success_action(response.data));
        }else{
            dispatch(log_error_action(response.msg));
        }
    }
}

export function user_async_action(){
    return async dispatch => {
        initIO(dispatch);
        const result = await reqUser();
        const response = result.data;
        if(response.code){
            dispatch(log_success_action(response.data));
        }
    }
}