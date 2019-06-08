import React from "react";
import { Form, Icon, Input, Button, Checkbox , message} from 'antd';
import {connect} from "react-redux";

import {login_async_action} from "../../redux/actions";


class Login extends React.Component{

    toRegister = () => {
      this.props.history.replace("/register");
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.login_async_action(values);
            this.props.history.replace("/");
            message.success("登入成功😏");
          }
        });
      };
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               
                <Form onSubmit={this.handleSubmit} className="login-form">
                <p style={{textAlign:"center"}}>LOGIN😃</p>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a onClick={this.toRegister}>register now!</a>
        </Form.Item>
      </Form>
            </div>
        )
    }
}

 const Login2 = Form.create({ name: 'normal_login' })(Login);

 export default connect(
   state => ({user:state.user}),
   {login_async_action}
 )(Login2);