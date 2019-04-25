
require ('pages/common/footer')
require ('pages/common/logo')
require ('./index.css')
var _util = require ('util')
var _user = require('service/user')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')

	}
}



var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		const _this = this;
		$('#btn-submit').on('click',function(){
			_this.submitLogin()
		})
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitLogin()
			}
		})
	},
	submitLogin:function(){
		//1.获取数据
		var	formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		//2.验证数据
		var validateResult = this.validate(formData)
		//3.发送请求
		//验证通过
		if(validateResult.status){
			formErr.hide()
			_user.login(formData,function(){
				_util.goHome()
			},function(msg){
				formErr.show(msg)
			})
		}
		//验证失败
		else{
			formErr.show(validateResult.msg)
		}
	},
	validate:function(formData){
		var result ={
			status:false,
			msg:''
		}
		//用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		//用户名格式
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不对';
			return result;
		}
		//密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//密码格式
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不对';
			return result;
		}



		result.status=true;
		return result
	}
	
}
$(function(){
	page.init()
})

