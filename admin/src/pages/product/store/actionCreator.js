
import * as types from './actionTypes.js'
import { request} from 'util'
import { message } from 'antd'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES,UPDATE_CATEGORY_ORDER} from 'api'

const getPageRequestAction = ()=>{
	return{
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return{
		type:types.PAGE_DONE
	}
}



const getAddRequestAction = ()=>{
	return{
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return{
		type:types.ADD_DONE
	}
}



const setLevelOneCategoriesAddAction = (payload)=>{
	return {
		type:types.SET_LEVEL_ONE_CATEGORIES,
		payload
	}
}



const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}

export const getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			url:GET_CATEGORIES,
			data:{
				page:page,
				pid:pid
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
	}
}

export const getAddAction =(values)=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORY,
			data:values
		})
		.then(result=>{
			if(result.code == 0 ){
				if(result.data){
					dispatch(setLevelOneCategoriesAddAction(result.data))	
				}
				message.success('添加分类成功')
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('添加分类失败')
		})
		.finally(()=>{
			dispatch(getAddDoneAction())
		})
	}	
}
export const getLevelOneCategoriesAddAction = ()=>{
	return (dispatch)=>{
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			console.log(result)
			dispatch(setLevelOneCategoriesAddAction(result.data))
		})	
	}
}

//getOrderAction(pid,id,newOrder)

export const getOrderAction = (pid,id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category')
		request({
			method:'put',
			url:UPDATE_CATEGORY_ORDER,
			data:{
				pid:pid,
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then(result=>{
			dispatch(setPageAction(result.data))
		})	
	}
}