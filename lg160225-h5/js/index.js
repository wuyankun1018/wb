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
		location.hash = 'index='+$pagesContainer.data('actIndex')
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
		location.hash = 'index='+$pagesContainer.data('actIndex')
	}).on('initTab', function(event, index) {
		var actIndex = $pagesContainer.data('actIndex')|0
		var transform = 'translateY('+(-$pagesContainer.data('actIndex')*100)+'%)'
		changeTransform.call($pagesContainer, transform)
		$pagesContainer.css('width') //for read
		$pagesContainer.addClass('tz')
	}).trigger('initTab')


})