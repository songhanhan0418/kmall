/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:53:38
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as loginReducer  } from 'pages/login/store'
import { reducer as homeReducer  } from 'pages/home/store'
import { reducer as userReducer  } from 'pages/user/store'
import { reducer as categoryReducer  } from 'pages/category/store'
import { reducer as productReducer  } from 'pages/product/store'

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer	

})