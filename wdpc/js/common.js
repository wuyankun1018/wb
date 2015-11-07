$(function(){
	var scrollTop = 0;
	var timeoutFlag = 0;
	$(window).on('scroll', function(event) {
		if(timeoutFlag) clearTimeout(timeoutFlag);
		timeoutFlag = setTimeout(function(){
			var _scrollTop = $(this).scrollTop()
			if(_scrollTop< scrollTop){
				$('.footer_container').find('.for_fix_wrap').addClass('fixed')
			} else {
				$('.footer_container').find('.for_fix_wrap').removeClass('fixed')
			}
			scrollTop = _scrollTop
			timeoutFlag = 0
		},100)
	});
	$('.gotop').on('click', function(event) {
		event.preventDefault();
		$(window).scrollTop(0)
	});
})