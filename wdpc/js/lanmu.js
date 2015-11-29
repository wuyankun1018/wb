$(function(){
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
	
	$('.thumb_wrapper').on('click', '.item', function(event) {
		$(this).addClass('act').siblings().removeClass('act')
		$('.main_img').find('img').attr('src', $(this).attr('src'))
		$('.main_img').find('.img_tle_wrap').text($(this).data('title'))
	});
})