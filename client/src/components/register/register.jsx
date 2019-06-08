import React from "react";
import { Form, Icon, Input, Button, Checkbox , message} from 'antd';
import {connect} from "react-redux";

import {register_async_action} from "../../redux/actions";

class Register extends React.Component{

    toLogin = () => {
      this.props.history.replace("/login");
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.register_async_action(values);
            this.props.history.replace("/");
            message.success("登入成功😛");
          }
        });
      };
      handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               
                <Form onSubmit={this.handleSubmit} className="login-form">
                <p style={{textAlign:"center"}}>REGISTER😃</p>
                <Form.Item>
          {getFieldDecorator('playername', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="crown" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="昵称"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item  hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password  prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="密码"/>)}
        </Form.Item>
        <Form.Item  hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
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
          Or <a onClick={this.toLogin}>login now!</a>
        </Form.Item>
      </Form>
            </div>
        )
    }
}

 const Register2 = Form.create({ name: 'normal_login' })(Register);

 export default connect(
   state => ({user : state.user}) , 
   {register_async_action}
 )(Register2);