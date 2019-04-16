
import React,{ Component } from 'react'
//connect方法负责把store里面的数据和方法映射到UI组件
import { connect } from 'react-redux'
import {actionCreator} from './store'
import axios from 'axios'
import {
  Form, Icon, Input, Button, Checkbox,message
} from 'antd';

import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
        isFetching:false
    }
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values)
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
                <Button 
                    type="primary" 
                    onClick={this.handleSubmit} 
                    className="login-form-button"
                    loading={this.props.isFetching}
                >
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
const mapStateToProps = (state)=>{
    console.log(state)
    return {
        isFetching:state.get('login').get('isFetching')
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleLogin:(values)=>{
            const action =actionCreator.getLoginAction(values)
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);