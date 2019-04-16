/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'
import axios from 'axios';
import {message} from 'antd'
import { ADMIN_LOGIN } from 'api'
import { setStorage } from 'util'


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
        axios({
        	method:'post',
        	url:ADMIN_LOGIN,
        	data:values
        })
        .then(result=>{
          if(result.data.code == 0){//登录成功
            //跳转到后台首页
            setStorage(result.data)
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
    }
}

