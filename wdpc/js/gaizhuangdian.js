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
})