import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Header extends React.Component {

    toLogin = () => {
        this.props.history.replace("/register");
    }

    render () {
        const {_id,username,playername} = this.props.user;
        return (
            <div className="header">
                {playername ? <p className="userHeader">{playername.substring(0,1)}</p> : <p onClick={this.toLogin} className="userHeader">😛</p>}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}) , {}
)(withRouter(Header))