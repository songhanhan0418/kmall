
import * as types from './actionTypes.js'
import axios from 'axios';
import {message} from 'antd'
import { ADMIN_LOGIN } from 'api'
import { setUserName, request} from 'util'


const getLoginRequestAction = ()=>{
	return{
		type:types.LOGIN_REQUEST
	}
}
const getLoginDoneAction = ()=>{
	return{
		type:types.LOGIN_DONE
	}
}

export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequestAction())
    /*
        axios({
        	method:'post',
        	url:ADMIN_LOGIN,
        	data:values
        })
        .then(result=>{
          if(result.data.code == 0){//登录成功
            //跳转到后台首页
            setUserName(result.data)
            window.location.href = "/"
          }else if(result.data.code == 1){
            message.error(result.data.message)
          }
        })
        .catch(err=>{
          console.log(err);
          message.error('网络请求失败,请稍后再试')
        })
        .finally(()=>{
        	dispatch(getLoginDoneAction())
        })
        */

        request({
          method:'post',
          url:ADMIN_LOGIN,
          data:values         
        })
        .then(result=>{
          if(result.code == 0){//登录成功
            setUserName(result.data.username)
            //跳转到后台首页
            
            window.location.href = "/"
          }else if(result.code == 1){
            message.error(result.message)
          }
        })
        .catch(err=>{
          console.log(err);
          message.error('网络请求失败,请稍后再试')
        })
        .finally(()=>{
          dispatch(getLoginDoneAction())
        })
    }
}

