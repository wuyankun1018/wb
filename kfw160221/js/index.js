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
		,isLoadOver = false
	function loadListData(isReload){
		if(isLoading) return;
		if(!isReload && isLoadOver) return;
		if(isReload){
			LoadIndex = 0;
			isLoadOver = false;
			$('.rider_list').empty()
		}
		isLoading = true
		$('.rider_list').render('loading-item-tmp', {}, !isReload)
		index = LoadIndex
		var opts = {
			skill:$('[data-key=skill]').find('.selected').data('value')
			,sort:$('[data-key=sort]').find('.selected').data('value')
			,online:$('[data-key=online]').find('.selected').data('value')
			,index:index
		}
		opts = $.extend(opts, defaultOpts);
		
		$.post('/flow/v1_0/courier/list', opts, function(res){
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
				isLoadOver = true
			}
		}, 'json').fail(function(){
			alert('获取数据失败')
		}).complete(function(){
			isLoading = false
			$('.loading').remove()
		})
	}

	$(".rider_list").scroll(function(){
         var $this =$(this),
         viewH =$(this).height(),//可见高度
         contentH =$(this).get(0).scrollHeight,//内容高度
         scrollTop =$(this).scrollTop();//滚动高度
        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
        if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
        	loadListData()
        }
     }).on('click', '.right_wrap', function(event) {
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