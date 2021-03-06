/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 17:17:05
*/

import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";

import { getUserName } from 'util'

import Login from './pages/login'
import Home from './pages/home'
import User from './pages/user'
import Category from './pages/category'
import Product from './pages/product'
import Err from './common/err'
import './App.css'


class App extends Component{

	render(){
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>{
				return	getUserName()
					? <Component  {...props} />
					: <Redirect to='/login'   />
				}}
			/>
		)

		const LoginRoute = ({component:Component,...rest})=>{
			return getUserName()
			?	<Redirect to='/'  />
			:   <Component {...rest} />
		}
		return( 
			<Router forceRefresh={true} >
				<div className="App">
					<Switch>
					<ProtectRoute exact path="/" component={Home} />
					<ProtectRoute path="/user" component={User} />
					<ProtectRoute path="/category" component={Category} />
					<ProtectRoute path="/product" component={Product} />
					<LoginRoute path="/login" component={Login} />
					<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}


export default App;