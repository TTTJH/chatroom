import {combineReducers} from "redux";

import {
    LOG_REQ_ERROR,
    LOG_REQ_SUCCESS,
    MSGLIST_REQ_ERROR,
    MSGLSIT_REQ_SUCCESS,
    NEWMSG_RECEIVE,

}from "./action-types";

let initUser = {
    username : "",
    password : "",
    playername : "",
}

function user(state = initUser , action){
    switch(action.type){
        case LOG_REQ_SUCCESS : {
            return action.data;
        }
        case LOG_REQ_ERROR : {
            return action.data;
        }
        default : 
            return state;
    }
}

let initChat = [];

function chat (state = initChat , action){
    switch(action.type){
        case MSGLSIT_REQ_SUCCESS : {
            return action.data;
        }
        case MSGLIST_REQ_ERROR : {
            return action.data;
        }
        case NEWMSG_RECEIVE : {
            console.log(state);
            console.log([...state,action.data]);
            return [...state,action.data];
        }
        default : {
            return state;
        }
    }
}

export default combineReducers({
    user,
    chat,

})