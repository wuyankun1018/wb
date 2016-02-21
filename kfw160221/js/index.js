$(function(){
	var $tabConList = $('.con_wrap>.select_list')
	$('.tab_wrap').on('click', '.tab_item', function(event) {
		var index = $(this).index()
		var $ul = $tabConList.eq(index).addClass('act').siblings('.select_list').removeClass('act')
		$('.tab_mask').show()
	});
	var defaultOpts = {
		group_id:getUrlParam('group_id')
		,latitude:getUrlParam('latitude')
		,longitude:getUrlParam('longitude')
	}

	function getUrlParam(name){  
	     var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");  
	     var matcher = pattern.exec(location.href);  
	     var items = null;  
	     if(null != matcher){  
	             try{  
	                    items = decodeURIComponent(decodeURIComponent(matcher[1]));  
	             }catch(e){  
	                     try{  
	                             items = decodeURIComponent(matcher[1]);  
	                     }catch(e){  
	                             items = matcher[1];  
	                     }  
	             }  
	     }  
	     return items;  
	}  

	$('.con_wrap').on('click', 'li', function(event) {
		var $list = $(this).parents('.select_list')
		$list.find('.selected').removeClass('selected')
		if($(this).find('.child_list_wrap').length){
			$list.addClass('show_child_list')
			$(this).addClass('show_child_list')
		} else {
			$(this).addClass('selected')
			freshTabItem($list.index(), $(this).html().trim())
		}
	});

	$('.tab_mask').on('click', function(event) {
		$(this).hide()
		$tabConList.removeClass('act')
	});

	function freshTabItem(listIndex, name, key, value){
		//refresh tab
		$('.tab_wrap').find('.tab_item').eq(listIndex).find('.tab_name').html(name)
		//hide tab
		$tabConList.removeClass('act')
		$('.tab_mask').hide()
		//reload data
		loadListData(1)
	}

	var LoadIndex = 0
		,isLoading = false
		,isLoadListOver = false
	function loadListData(isReload){
		if(isReload){
			if(isLoading){
				isLoading.abort()
			}
			LoadIndex = 0;
			isLoadListOver = false;
			$('.rider_list').empty()
		}
		if(isLoading) return;
		if(!isReload && isLoadListOver) return;
		$('.rider_list').render('loading-item-tmp', {}, !isReload)
		$('.loading')[0] && $('.loading')[0].scrollIntoView()
		index = LoadIndex
		var opts = {
			skill:$('[data-key=skill]').find('.selected').data('value')
			,sort:$('[data-key=sort]').find('.selected').data('value')
			,online:$('[data-key=online]').find('.selected').data('value')
			,index:index
		}
		opts = $.extend(opts, defaultOpts);
		
		isLoading = $.post('/flow/v1_0/courier/list', opts, function(res){
			console.log(res)
			var dataArr = res.data.data || [];
			dataArr.forEach(function(item){
				item.scoreArr = []
				item.noneScoreArr = []
				for(var i=0;i<item.score;i++){
					item.scoreArr.push(i)
				}
				for(var i=0;i<5-item.score;i++){
					item.noneScoreArr.push(i)
				}

			})
			if(res.respcd!='0000'){
				alert(res.resperr)
			} else {
				LoadIndex = res.data.index+1
			}
			if(dataArr.length){
				$('.rider_list').render('item-tmp',{list:dataArr},!isReload)
			} else {
				$('.rider_list').render('none-item-tmp', {}, !isReload)
				isLoadListOver = true
			}
		}, 'json').fail(function(){
			alert('获取数据失败')
		}).complete(function(){
			isLoading = false
			$('.loading').remove()
		})
	}

	var windowHeight = $(window).height()
	window.onscroll=function(){
		// var a = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;
		var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
		var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
		if(c-b<windowHeight+10){
			loadListData()
		}
	}

	$(".rider_list").on('click', '.right_wrap', function(event) {
     	event.preventDefault();
     	var cid = $(this).parents('.rider_item').data('cid')
     	try{
     		androidWebApi.chat(cid)
     	} catch(e){
     		alert('invoke androidWebApi.chat err. '+e.toString())
     	}
     }).on('click', '.left_wrap,.center_wrap', function(event) {
     	event.preventDefault();
     	var cid = $(this).parents('.rider_item').data('cid')
     	window.open('/flow/view/courier_home?courier_id='+'cid')
     });

 	function init(){
		loadListData(1)
	}

	init()
})