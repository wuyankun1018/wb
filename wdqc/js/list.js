$(function(){
	var channelId = location.search.substr(1)|0
	$('.nav_item').eq(channelId).addClass('act')

	var Carousel = {
		index : 0
		,itemWidth : 0
		,itemNum : 0
		,parentUl : null
		,tipWrapper : null
		,go : function(forward){
			if(forward==='left'){
				if(this.index>0)
					this.index-=1
				else
					this.index=this.itemNum-1
			} else if(forward==='right') {
				if(this.index<=this.itemNum-2)
					this.index+=1
				else
					this.index=0
			}
			this.parentUl && this.parentUl.css({
				marginLeft: -this.index*this.itemWidth +'rem'
			});
			this.tipWrapper && this.tipWrapper.find('.tip_item').eq(this.index).addClass('act').siblings().removeClass('act')
		}
		,init:function(p){
			p = p || {}
			this.itemWidth = p.itemWidth || this.itemWidth
			this.itemNum = p.itemNum || this.itemNum
			this.parentUl = p.parentUl || this.parentUl
			if(p.tipWrapper){
				this.tipWrapper = p.tipWrapper
				var _html = ''
				for (var i = 0; i < this.itemNum; i++) {
					_html+='<div class="tip_item'+(this.index==i?' act':'')+'"></div>'
				}
				this.tipWrapper.html(_html)
			}
		}
	}

	function getListItemHtml(data){
		return [
			'<a href="detail.html?'+data.id+'" class="list_item'+(data.type?'':' no_img')+'">'
			,data.type?'<img src="'+data.pic+'" alt="新闻缩略图" class="list_item_img">':''
			,'<h3 class="list_item_tle">'+data.title+'</h3>'
			,'<p class="list_item_con">'+data.desc+'</p>'
			,'</a>'
		].join('')
	}

	var List = {
		page:1
		,limit:10
		,isLoading:false
		,isFinish:false
		,load:function(cb){
			var _this = this
			if(_this.isLoading) return;
			_this.isLoading = true
			$.ajax({
				url: '/m/list/'+channelId+'/'+_this.page,
				type: 'get',
				dataType: 'json',
				success:function(res){
					if(res.code===1){
						if(res.article_list.length<10){
							_this.isFinish = true
						}
						var _alhtml = ''
						res.article_list && res.article_list.forEach(function(item){
							_alhtml+=getListItemHtml(item)
						})
						$('.list_wrapper').append(_alhtml)
					}
					cb && cb(res.code, _this.isFinish)
				},
				complete:function(xhr, status){
					_this.page+=1
					_this.isLoading=false
					if(status!='success'){
						cb && cb(0, this.isFinish)
					}
				}
			})			
		}
	}

	$('.banner_wrapper')
		.on('tap', '.banner_go_left', function(event) {
			event.preventDefault();
			Carousel.go('left')
		}).on('tap', '.banner_go_right', function(event) {
			event.preventDefault();
			Carousel.go('right')
		}).on('swipeLeft',function(event){
			Carousel.go('right')
		}).on('swipeRight', function(event) {
			Carousel.go('left')
		});

	$('.more_list_btn').on('click', function(event) {
		var _this = $(this)
		_this.hide()
		$('.loading_status').show()
		List.load(function(isSuccess,isFinish){
			$('.loading_status').hide()
			if(!isFinish){
				_this.show()
			}
		})
	});

	if(channelId===0){
		$('.loading_status').show()
		$.ajax({
			url: '/m/home',
			type: 'get',
			dataType: 'json',
			success:function(res) {
				$('.loading_status').hide()
				if(res.code===1){
					var _pphtml = ''
					res.pic_play && res.pic_play.forEach(function(item){
						_pphtml += '<li class="banner_item"><a href="detail.html?'+item.article_id+'"><img src="'+item.pic_url+'" alt="banner" class="banner_img"></a></li>'
					})
					$('.banner_ul').html(_pphtml)
					Carousel.init({
						parentUl:$('.banner_ul')
						,itemWidth:6.18
						,itemNum:$('.banner_ul .banner_item').length
						,tipWrapper:$('.banner_tip_wrapper')
					})
					var _alhtml = ''
					res.article_list && res.article_list.forEach(function(item){
						_alhtml+=getListItemHtml(item)
					})
					$('.list_wrapper').html(_alhtml)
				}
			}
		})
	} else {
		$('.more_list_btn').trigger('click')
	}

})