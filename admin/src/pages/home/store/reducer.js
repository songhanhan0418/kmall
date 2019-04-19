
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	usernum:0,
	productnum:0,
	ordernum:0
})
//1. reducer是一个函数
//2. reducer是一个纯函数(固定的输入就有固定的输出)
//3. reducer的主要作用是负责业务逻辑处理,生成新的state,由store来最终改变

export default (state=defaultState,action)=>{

	if(action.type == types.SET_COUNT){

		return state.merge({
			usernum:action.payload.usernum,
			productnum:action.payload.productnum,
			ordernum:action.payload.ordernum,
		})
	}	

	return state;
}