$(function(){
	$('.tuji_pop_win').on('click', function(event) {
		$(this).hide()
	}).on('click', '.pop_win_con', function(event) {
		event.stopPropagation()
	}).on('click', '.thumb_list img', function(event) {
		$(this).addClass('act').siblings().removeClass('act')
		var $win = $('.tuji_pop_win')
		$win.find('.main_img').attr('src', $(this).attr('src'))
		$win.find('.pop_tle').html( $(this).data('title'))
		$win.find('.pop_con').html( $(this).data('content'))
		var $list = $('.tuji_pop_win').find('.thumb_list')
		var ml = parseInt($list.css('margin-left'))||0
		var left = $(this).position().left - ml
		var itemWidth = $(this).outerWidth() +5
		var totalWidth = itemWidth * $list.children().length 
		var showWidth = $('.thumb_wrapper').width()
		var maxML = totalWidth - showWidth
		left -= itemWidth
		if(left<0) left=0;
		if(left>maxML) left = maxML;
		$list.css({
			marginLeft: -left
		});
	}).on('click', '.to_left', function(event) {
		$('.tuji_pop_win').find('.thumb_list').find('.act').prev().trigger('click')
	}).on('click', '.to_right', function(event) {
		$('.tuji_pop_win').find('.thumb_list').find('.act').next().trigger('click')
	});

	$('.tuji_img_list').on('click', 'img', function(event) {
		initPopWin($('.tuji_img_list img'))
		$('.tuji_pop_win').show()
		$('.tuji_pop_win').find('.thumb_list').find('img').eq($(this).index()).trigger('click')
	});

	function initPopWin(eles){
		//初始化弹出窗口的数据
		var $popImgList = $('.tuji_pop_win').find('.thumb_list').empty()
		for (var i = 0; i < eles.length; i++) {
			eles.eq(i).clone().appendTo($popImgList)
		}
	}
})