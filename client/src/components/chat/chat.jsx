import React from "react";
import {connect} from "react-redux";
import {Input , Icon} from "antd";

import {sendMsg_async_action , getMsgList_async_action} from "../../redux/actions";

class Chat extends React.Component {
    componentWillMount(){
        this.props.getMsgList_async_action();
    }
    componentDidUpdate(){
        document.querySelector(".chat-box").scrollTo(0,document.querySelector(".chat-box").scrollHeight);
    }
    state = {
        msg : "",
    }

    msgChange = (e) => {
        const msg = e.target.value;
        this.setState({msg});
    }

    send = () => {
        const data = {content : this.state.msg,from:this.props.user.playername,userid:this.props.user._id};
        this.props.sendMsg_async_action(data);
        this.props.getMsgList_async_action();
        this.setState({msg:""});
        console.log(data);
    }



    render () {
        const {chat} = this.props;
        const {_id} = this.props.user;
        console.log(chat);
            return (
                <div  className="chat">
                    <div className="chat-box">
                        {chat.map((item , index) => {
                            if(item.userid == _id){
                                //自己发的消息
                                return (
                                    <div className="my-msg-box msg-box" key={index}>
                                        <p className="myContent content">{item.content}</p>
                                    <p className="myHeader userHeader2">{item.from.substring(0,1)}</p>
                                    
                                </div>
                                )
                            }else{
                                return (
                                    <div className="others-msg-box msg-box" key={index}>
                                        <p className="otherHeader userHeader2">{item.from.substring(0,1)}</p>
                                        <p className=" otherContent content">{item.content}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="chat-bottom">
                    <Input onChange={this.msgChange} value = {this.state.msg} style={{width:"250px"}} placeholder="Basic usage" />
                    <Icon onClick={this.send} style={{fontSize:"28px",}} type="arrow-up"  />
                    </div>
                </div>
            )
        

    }
}

export default connect(
    state => ({user:state.user,chat:state.chat})
    ,{sendMsg_async_action,getMsgList_async_action}
)(Chat)