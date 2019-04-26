
require ('pages/common/nav')
require ('pages/common/search')
require ('pages/common/side')
require ('pages/common/footer')
require ('./index.css')

var _side = require ('pages/common/side')
var _util = require ('util')
var _user = require('service/user')

var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(user){
			
		})
	}
}
$(function(){
	page.init()
})

