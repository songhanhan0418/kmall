require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')
var page = {
	listParam:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.initPagination();
		this.loadProductList();
		this.bindEvent();
	},
	initPagination:function(){
		this.$pagination = $('.pagination-box');
		this.$pagination.pagination()
	},
	bindEvent:function(){
		var _this = this
		$('.sort-item').on('click',function(){
			var $this = $(this)
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active')
				_this.listParam.orderBy = 'default'
			}
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item').removeClass('active')
				if($this.hasClass('asc')){
					$this.addClass('desc')
					.removeClass('asc')
				_this.listParam.orderBy = 'price_desc'
				}
				else if($this.hasClass('desc')){
					$this.addClass('asc')
					.removeClass('desc')
				_this.listParam.orderBy = 'price_asc'
				}
			}
			_this.loadProductList();
		})
	},
	loadProductList:function(){
		this.listParam.keyword ? (delete this.listParam.categoryId) : (delete this.listParam.keyword)
		_product.getProductList(this.listParam,function(result){
			if(result.list.length > 0){
				result.list.forEach(function(product){
					product.image = product.images.split(',')[0]
				})
				var html = _util.render(tpl,{
					list:result.list
				})
				$('.product-list-box').html(html)
			}else{
				$('.product-list-box').html('<p class="empty-msg">你要找的商品找不到了</p>')
			}


		},function(msg){
			_util.showErrorMsg(msg)
		})
	}

}
$(function(){
	page.init();
}) 