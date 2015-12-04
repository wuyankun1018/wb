$(function(){
	$('.gzd_brand_wrap').on('click', '.brand_list .to_left', function(event) {
		var index = $('.gzd_brand_wrap').find('.count_nav .act').index()
		index--
		if(index<0) index=0;
		change(index)
		
	}).on('click', '.brand_list .to_right', function(event) {
		var index = $('.gzd_brand_wrap').find('.count_nav .act').index()
		index++
		var length = $('.gzd_brand_wrap').find('.count_nav').children().length
		if(index>length-1) index=length-1;
		change(index)
		
	})
	function change(index){
		var width = $('.gzd_brand_wrap').find('.con_show_wrap').outerWidth()
		$('.gzd_brand_wrap').find('.count_nav').children().removeClass('act').eq(index).addClass('act')
		$('.gzd_brand_wrap').find('.con_wrap').css({
			marginLeft: -index*width
		});
	}

	$('.gzd_header').on('click', '.item', function(event) {
		$(this).addClass('act').siblings().removeClass('act')
		$('.main_img').find('img').attr('src', $(this).attr('src'))
		$('.main_img').find('.img_tle_wrap').text($(this).data('title'))
	});

	var bannerAutoFlag = false; //是否自动轮播
	$('.tuku_header').on('mouseleave', function(event) {
		bannerAutoFlag = false
	}).on('mouseenter', function(event) {
		bannerAutoFlag = true
	})

	window.setInterval(function(){
		if(bannerAutoFlag) return;
		var $tleItems = $('.thumb_wrapper').find('.item')
		var nextIndex = $tleItems.filter('.act').index()
		nextIndex++
		if(nextIndex<0 || nextIndex>$tleItems.length-1){
			nextIndex = 0;
		}
		$tleItems.eq(nextIndex).trigger('click')
	}, 5000)
})