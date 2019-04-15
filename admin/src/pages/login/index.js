
import React,{ Component } from 'react'
//connect方法负责把store里面的数据和方法映射到UI组件
import axios from 'axios'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
        	method:'post',
        	url:'http://127.0.0.1:3000/admin/login',
        	data:values
        })
        .then(result=>{
        	if(result.data.code == 0){
            window.location.href = '/'
          }else if(result.data.code == 1){
            message.error(result.data.message)
          }
        })
        .catch(err=>{
          console.log(err)
        	message.error('网络请求失败，请稍后重试')
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
			<Form className="login-form">
			<Form.Item>
			  {getFieldDecorator('username', {
			    rules: [{ required: true, message: '请输入用户名!' },{ pattern: /^[a-z0-9]{3,6}$/, message: '请输入3-6位字符或数字!' }],
			  })(
			    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
			  )}
			</Form.Item>
			<Form.Item>
			  {getFieldDecorator('password', {
			    rules: [{ required: true, message: '请输入密码!' },{ pattern: /^[a-z0-9]{3,6}$/, message: '请输入3-6位字符或数字!' }],
			  })(
			    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
			  )}
			</Form.Item>
			<Form.Item>
			  <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
			    登录
			  </Button>
			</Form.Item>
			</Form>
		</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
//1.connect方法第一个参数指定映射数据的方法
//1.connect方法第二个参数指定映射方法的方法
//3.返回一个方法，这个方法用来指定UI组件，这个方法会返回一个容器组件
export default WrappedNormalLoginForm;