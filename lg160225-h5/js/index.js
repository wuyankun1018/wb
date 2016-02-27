$(function(){

	var $pagesContainer = $('.pages_container')
		,$pageItems = $pagesContainer.find('.page_item')
		,pageLength = $pageItems.length

	function lazyLoad(page_num){
		// type: data-lazy bg/src
		// url: data-lazyurl
		if(page_num<0||page_num>=$pageItems.length) return;
		page_num = page_num|0
		$pageItems.eq(page_num).find('[data-lazy]').each(function(index, ele){
			var $ele = $(ele)
				,url = $ele.data('lazyurl')
				,type = $ele.data('lazy')
			if(!type||!url) return;
			if(type==='bg'){
				$ele.css({
					'background-image': 'url("'+url+'")'
				})
			} else {
				$ele.attr('src', url)
			}
			$ele.removeAttr('data-lazy')
		})
	}

	//act item
	var actIndex = 0
	actIndex = getIndex(actIndex, pageLength)
	$pagesContainer.data('actIndex', actIndex)
	lazyLoad(actIndex)
	lazyLoad(actIndex-1)
	lazyLoad(actIndex+1)

	function getIndex(index, length){
		if(index>=length) return length-1;
		if(index<0) return 0;
		return index;
	}

	function changeTransform(transform){
		$(this).css({
			'transform':transform
			,'-webkit-transform':transform
		})
	}

	var noSwipeSelectors = [
		'.goods_list'
		,'.cover_list'
	]

	function isChildEle(parentSelectors, ele){
		var result = false;
		if(!parentSelectors || !ele) return result;
	 	return parentSelectors.some(function(selector){
			return !!ele.parents(selector).length
		});
	}

	$pagesContainer.on('touchmove', function(event) {
		if(!isChildEle(noSwipeSelectors, $(event.target)))
			event.preventDefault();
	}).on('swipeUp', function(event) {
		if(isChildEle(noSwipeSelectors, $(event.target))) return;
		var actIndex = $pagesContainer.data('actIndex')|0
		actIndex = getIndex(actIndex+1, pageLength)
		$pagesContainer.data('actIndex', actIndex)
		lazyLoad(actIndex)
		lazyLoad(actIndex-1)
		lazyLoad(actIndex+1)
		var transform = 'translateY('+(-$pagesContainer.data('actIndex')*100)+'%)'
		changeTransform.call($pagesContainer, transform)
	}).on('swipeDown', function(event) {
		if(isChildEle(noSwipeSelectors, $(event.target))) return;
		var actIndex = $pagesContainer.data('actIndex')|0
		actIndex = getIndex(actIndex-1, pageLength)
		$pagesContainer.data('actIndex', actIndex)
		lazyLoad(actIndex)
		lazyLoad(actIndex-1)
		lazyLoad(actIndex+1)
		var transform = 'translateY('+(-$pagesContainer.data('actIndex')*100)+'%)'
		changeTransform.call($pagesContainer, transform)
	}).on('initTab', function(event, index) {
		var actIndex = $pagesContainer.data('actIndex')|0
		var transform = 'translateY('+(-$pagesContainer.data('actIndex')*100)+'%)'
		changeTransform.call($pagesContainer, transform)
		$pagesContainer.css('width') //for read
		$pagesContainer.addClass('tz')
	}).trigger('initTab')

	$('.share_btn,.share_mask').on('click', function(event) {
		$('.share_mask').toggle()
	});

	$('.scroll_wrap').on('click', 'a', function(event) {
		event.preventDefault();
	});

	$('.p6_scroll_wrap').on('swipeLeft', function(event) {
		console.log('l+1')
		var sitems = $('.dot_wrap').find('div')
		var act = sitems.filter('.act')
		var index = act.index()
		index++
		if(index>=sitems.length) index = 0;
		sitems.eq(index).addClass('act').siblings().removeClass('act')
		changeTransform.call($(this).find('.scroll_w'), 'translateX(-'+5.6*index+'rem)')

	}).on('swipeRight', function(event) {
		console.log('r-1')
		var sitems = $('.dot_wrap').find('div')
		var act = sitems.filter('.act')
		var index = act.index()
		index--
		if(index<0) index = sitems.length-1;
		sitems.eq(index).addClass('act').siblings().removeClass('act')
		changeTransform.call($(this).find('.scroll_w'), 'translateX(-'+5.6*index+'rem)')
	})

	
	
	//嘉宾轮播
	;(function(){
		var actIndex = 0;
		var wrap = $('.man_list')
		var manItem = wrap.find('.man_item')
			,length = manItem.length
			,width = 2.13
		wrap.append(manItem.clone())
		wrap.prepend(manItem.clone())
		manItem.addClass('curr')
		changeTransform.call(wrap, 'translateX(-'+width*length+'rem)')

		$('.man_s_wrap').on('click', '.lbtn_wrap', function(event) {
			actIndex--;
			moveTo()
		}).on('click', '.rbtn_wrap', function(event) {
			actIndex++;
			moveTo()
		})

		function moveTo(){
			//actIndex min:0 max:length-6
			wrap.removeClass('tz')
			console.log(actIndex)
			if(actIndex<0){
				changeTransform.call(wrap, 'translateX(-'+2*width*length+'rem)')
				actIndex = actIndex+length
			} else if(actIndex>length){
				changeTransform.call(wrap, 'translateX(-'+width*length+'rem)')
				actIndex = actIndex-length
			}
			wrap.css('width') 
			wrap.addClass('tz')
			changeTransform.call(wrap, 'translateX(-'+width*(actIndex+length)+'rem)')
		}

	})()

	//audio
	$('#audio_wrapper').on('tap', function(event) {
		$(this).toggleClass('playing');
		var $audio = $('#bg_audio')[0]
		if(!$(this).hasClass('playing')){
			$audio.pause()
		} else {
			$audio.play()
		}
	});
	try{
		$('#bg_audio')[0].play()
	} catch(e){}
})