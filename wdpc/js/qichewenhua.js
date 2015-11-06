$(function(){
	var bannerAutoFlag = false; //是否自动轮播
	$('.banner_wrap').on('mouseenter', '.tle_item', function(event) {
		var index = $(this).index()
		bannerChange(index)
	}).on('mouseleave', '.img_list_wrap,.tle_list_wrap', function(event) {
		bannerAutoFlag = false
	}).on('mouseenter', '.img_list_wrap,.tle_list_wrap', function(event) {
		bannerAutoFlag = true
	})

	function bannerChange(index){
		index = index || 0;
		var $bannerWrap = $('.banner_wrap')
		$bannerWrap.find('.tle_item').removeClass('act').eq(index).addClass('act')
		$bannerWrap.find('.img_item').removeClass('act').eq(index).addClass('act')
	}

	window.setInterval(function(){
		if(bannerAutoFlag) return;
		var $tleItems = $('.banner_wrap').find('.tle_item')
		var nextIndex = $tleItems.filter('.act').index()
		nextIndex++
		if(nextIndex<0 || nextIndex>$tleItems.length-1){
			nextIndex = 0;
		}
		bannerChange(nextIndex)
	}, 5000)

	$('.main_tab_wrap').on('click', '.tab_item', function(event) {
		var index = $(this).index()
		$(this).addClass('act').siblings().removeClass('act')
		$('.main_tab_wrap').find('.tab_con_wrap').removeClass('act').eq(index).addClass('act')
	});
})