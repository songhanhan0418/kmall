
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isPageFetching:false,
	isSaveFetching:false,
	list:[],
	current:1,
	pageSize:0,
	total:0,
	parentCategoryId:'',
	categoryId:'',
	images:'',
	detail:'',
	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',

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




	if(action.type == types.SET_CATEGORY_ID){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
            categoryIdHelp:'',
			imagesValidateStatus:'',
			imagesHelp:'',
		})
	}	


	if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:'',	
		})
	}	
	if(action.type == types.SET_DETAIL){
		return state.set('detail',action.payload)
	}	
	if(action.type == types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择商品分类!',
		})
	}	
	if(action.type == types.SET_IMAGES_ERROR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请选择图片!',
		})
	}	
	if(action.type == types.SAVE_REQUEST){
		return state.set('isSaveFetching',true)
	}
	if(action.type == types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}





	return state;
}