import ajax from "./ajax";

export const reqRegister = (data) => ajax("/register",data,"POST");

export const reqLogin = (data) => ajax("/login",data,"POST");

export const reqUser = () => ajax("/user");

export const reqMsgLsit = () => ajax("/msgList");