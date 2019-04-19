
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isAddFetching:false,
	isPageFetching:false,
	levelOneCategories:[],
	list:[],
	current:1,
	pageSize:0,
	total:0,
	updateNameModealVisible:false,
})
//1. reducer是一个函数
//2. reducer是一个纯函数(固定的输入就有固定的输出)
//3. reducer的主要作用是负责业务逻辑处理,生成新的state,由store来最终改变

export default (state=defaultState,action)=>{

	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,	
		})
	}	
	if(action.type == types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}	
	if(action.type == types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}
	if(action.type == types.ADD_DONE){
		return state.set('isAddFetching',false)
	}	
	if(action.type == types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}	
	return state;
}