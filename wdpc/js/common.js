$(function(){
	var scrollTop = 0;
	$(document,window,'body').on('scroll', function(event) {
		var _scrollTop = $(this).scrollTop()
		if(_scrollTop> scrollTop){
			$('.footer_container').find('.for_fix_wrap').addClass('fixed')
		} else {
			$('.footer_container').find('.for_fix_wrap').removeClass('fixed')
		}
		scrollTop = _scrollTop
	});
	$('.gotop').on('click', function(event) {
		event.preventDefault();
		$('body').scrollTop(0)
	});
})