
require ('pages/common/nav')
require ('pages/common/search')
require ('pages/common/footer')
require ('pages/common/logo')
require ('./index.css')
var _util = require ('util')
var _user = require('service/user')

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){

	}
}
$(function(){
	page.init()
})

