$(function(){
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
	
	$('.thumb_wrapper').on('click', '.item', function(event) {
		$(this).addClass('act').siblings().removeClass('act')
		$('.main_img').find('img').attr('src', $(this).attr('src'))
		$('.main_img').find('.img_tle_wrap').text($(this).data('title'))
	});

	$('.remodel_header').on('mouseenter', '.nav_wrap .item', function(event) {
		event.preventDefault();
		if($(this).hasClass('act')) return;
		$(this).addClass('act').siblings().removeClass('act')
		var index = $(this).index()
		$('.remodel_list_wrap').find('.remodel_list').removeClass('act').eq(index).addClass('act')
	});
})