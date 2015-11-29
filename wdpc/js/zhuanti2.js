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
		$(this).addClass('act').siblings('.num').removeClass('act')
	}).on('click', '.btn_wrap .prev', function(event) {
		var $act = $('.page_wrapper').find('.num.act')
		$act.prev('.num').trigger('click')
	}).on('click', '.btn_wrap .next', function(event) {
		var $act = $('.page_wrapper').find('.num.act')
		$act.next('.num').trigger('click')
	})
	$(document).on('keydown', function(event) {
		switch(event.keyCode){
			case 37:
				$('.page_wrapper').find('.btn_wrap .prev').trigger('click');
				break;
			case 39:
				$('.page_wrapper').find('.btn_wrap .next').trigger('click');
				break;
			default:
				break;
		}
	});
})