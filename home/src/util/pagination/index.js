require('./index.css')
;(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}
	Pagination.prototype = {
		constructor:Pagination,
		bindEvent:function(){

		},
	}


	//注册插件
	$.fn.extend({
		pagination:function(){
			return  this.each(function(){
				console.log('page...')
			})
		}
	})
})($)