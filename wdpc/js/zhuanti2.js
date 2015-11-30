$(function(){
	var bannerAutoFlag = false; //是否自动轮播
	$('.carousel_wrap').on('click', '.nav_tip_wrap>div', function(event) {
		var index = $(this).index()
		bannerChange(index)
	}).on('mouseleave', function(event) {
		bannerAutoFlag = false
	}).on('mouseenter', function(event) {
		bannerAutoFlag = true
	}).on('click', '.to_left', function(event) {
		bannerChange(getPrevIndex())
	}).on('click', '.to_right', function(event) {
		bannerChange(getNextIndex())
	})

	function bannerChange(index){
		index = index || 0;
		var $bannerWrap = $('.carousel_wrap')
		$bannerWrap.find('.img_item').removeClass('act').eq(index).addClass('act')
		$bannerWrap.find('.nav_tip_wrap>div').removeClass('act').eq(index).addClass('act')
	}

	function getNextIndex(){
		var $bannerWrap = $('.carousel_wrap')
		var currIndex = $bannerWrap.find('.img_item.act').index()
		if(currIndex<0 || currIndex+1>=$bannerWrap.find('.img_item').length){
			return 0
		}
		return ++currIndex
	}

	function getPrevIndex(){
		var $bannerWrap = $('.carousel_wrap')
		var currIndex = $bannerWrap.find('.img_item.act').index()
		if(currIndex<0 || currIndex-1>=$bannerWrap.find('.img_item').length){
			return $bannerWrap.find('.img_item.act').length-1
		}
		return --currIndex
	}

	window.setInterval(function(){
		if(bannerAutoFlag) return;
		var $tleItems = $('.carousel_wrap').find('.nav_tip_wrap>div')
		var nextIndex = $tleItems.filter('.act').index()
		nextIndex++
		if(nextIndex<0 || nextIndex>$tleItems.length-1){
			nextIndex = 0;
		}
		bannerChange(nextIndex)
	}, 5000)

	$('.page_wrapper').on('click', '.btn_wrap .num', function(event) {
		if($(this).hasClass('act')) return;
		changePageNum($(this).html()|0)
	}).on('click', '.btn_wrap .prev', function(event) {
		var $act = $('.page_wrapper').find('.num.act')
		$act.prev('.num').trigger('click')
	}).on('click', '.btn_wrap .next', function(event) {
		var $act = $('.page_wrapper').find('.num.act')
		$act.next('.num').trigger('click')
	})
	function changePageNum(num){
		var total = $('.page_num_wrapper').data('total')|0
		var html = ''
		if(num<6){
			for(var i=0;i<total;i++){
				var page = i+1
				if(i==9){
					if(total>10){
						html += '<span>...</span>'
					}
					html += '<a href="###" class="num">'+total+'</a>'
					break;
				} else {
					html += '<a href="###" class="num '+(num==page?'act':'')+'">'+page+'</a>'
				}
			}
		} else if(total-num>5){
			for(var i=0;i<total;i++){
				var page = i+1-5+num
				if(i==9){
					if(total>page){
						html += '<span>...</span>'
					}
					html += '<a href="###" class="num">'+total+'</a>'
					break;
				} else {
					html += '<a href="###" class="num '+(num==page?'act':'')+'">'+page+'</a>'
				}
			}
		} else if(total-num<10){
			html += '<a href="###" class="num">1</a>'
			html += '<span>...</span>'
			for(var i=0;i<total;i++){
				if(i>9) break;
				var page = total-10+i+1
				if(page<=0) continue;
				html += '<a href="###" class="num '+(num==page?'act':'')+'">'+page+'</a>'
			}
		}
		$('.page_num_wrapper').html(html)
	}
	changePageNum(1)
	$(document).on('keydown', function(event) {
		switch(event.keyCode){
			case 37:
				event.preventDefault()
				$('.page_wrapper').find('.btn_wrap .prev').trigger('click');
				break;
			case 39:
				event.preventDefault()
				$('.page_wrapper').find('.btn_wrap .next').trigger('click');
				break;
			default:
				break;
		}
	});
})