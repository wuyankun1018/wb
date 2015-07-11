$(function(){
	var articleId = location.search.substr(1)|0
	$.ajax({
		url: '/m/article/'+articleId,
		type: 'get',
		dataType: 'json',
		success:function(res){
			$('.loading_status').hide()
			if(res.code!==1) return;
			$('h1').html(res.title)
			$('.date').html(res.publish_time)
			$('.author').html(res.author)
			$('.content').html(res.content)
			var _abouthtml = ''
			res.about_list && res.about_list.forEach(function(item){
				_abouthtml += '<li class="about_item"><i></i><a href="?'+item.id+'">'+item.title+'</a></li>'
			})
			$('.about_list').html(_abouthtml)
			$('.like_num').html(res.goodnum)
		}
	})

	$('.like_btn').on('tap', function(event) {
		var _this = $(this)
		$.ajax({
			url: '/m/article/dogood/'+articleId,
			type: 'get',
			dataType: 'json',
			success:function(res){
				if(res.code===1){
					_this.addClass('liked')
					var num = ($('.like_num').html()|0)+1
					$('.like_num').html(num)
					_this.off('tap')
				}
			}
		})
		
	});
	
})