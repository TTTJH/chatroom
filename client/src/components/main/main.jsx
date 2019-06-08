import React from "react";
import {connect} from "react-redux";
import cookies from "js-cookies";

import Header from "../header/header";
import Chat from "../chat/chat";
import {user_async_action} from "../../redux/actions";

class Main extends React.Component {

    componentWillMount(){
        const {username , _id, playername } = this.props.user;
        const userid = cookies.getItem("userid");
        if(userid && !_id){
            this.props.user_async_action();
        }
    }

    render () {
        // if(!userid || (userid && _id)){
        //     return (
        //         <div>
        //             完全没登入的或已经实现了自动登入的正常情况😏
        //         </div>
        //     )
        // }
        // else if(userid && !_id){
        //     return (
        //         <div>
        //             需要进行自动重新登入的情况😏
        //         </div>
        //     )
        // }
        return (
            <div>
                <input type="file"></input>
                <Header/>
                <Chat/>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}), 
    {user_async_action}
)(Main)