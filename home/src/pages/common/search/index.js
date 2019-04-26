require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this
		//绑定退出事件
		$('#btn-search').on('click',function(){
			_this.submitSearch()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitSearch()
			}
		})
	},
	submitSearch:function(){
		var keyword = $('#search-input').val()
		window.location.href = './list.html?keyword='+keyword
	}
}

$(function(){
	nav.init()
})

