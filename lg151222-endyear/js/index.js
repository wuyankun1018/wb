var WIN_HEIGHT = $(window).height() //页面高度
	,WIN_WIDTH = $(window).width() //页面宽度
	,REM_WIN_WIDTH = 7.5
	,REM_WIN_HEIGHT = REM_WIN_WIDTH*WIN_HEIGHT/WIN_WIDTH

//屏幕尺寸适配
;(function(){
	$('[data-oh]').each(function(index, ele){
		var $this = $(ele)
		var oh = parseFloat($this.data('oh'))
		if(oh>REM_WIN_HEIGHT){
			var scale = REM_WIN_HEIGHT/oh
			var ty = (oh-REM_WIN_HEIGHT)/2
			changeTransform($this,'scale('+scale+') translateY(-'+ty+'rem)')
		}
	})
})();

/* 层级控制器，需要先调用init方法 */
var viewController = {
	viewParent: $('.main_container')
	,currentIndex: 0
	,length: 0 //总层数
	,init: function(index){
		// index 0~3 代表初始化时的层级
		index = index|0
		this.currentIndex = index
		this.length = this.viewParent.find('[class*=frame]').length
		var length = this.length
		if(this.currentIndex>length-1) 
			this.currentIndex=length-1;
		if(this.currentIndex<0) 
			this.currentIndex=0;
		this.reloadView()
	}
	,next: function(){
		//跳转至下一层
		this.currentIndex++
		var length = this.length
		if(this.currentIndex>length-1) 
			this.currentIndex=length-1;
		this.reloadView('next')
	}
	,prev: function(){
		//回到上一层
		this.currentIndex--
		if(this.currentIndex<0) 
			this.currentIndex=0;
		this.reloadView('prev')
	}
	,aniTimes:[]
	,delayDo:function(fn, time){
		var aniTimes = this.aniTimes;
		aniTimes.forEach(function(aid){
			clearTimeout(aid)
		})
		var aid = setTimeout(function(){
			fn && fn()
			aniTimes.splice(aniTimes.indexOf(aid),1)
		}, 1000)
		aniTimes.push(aid)
	}
	,reloadView: function(forward){
		forward = forward || 'next'
		var _viewParent = this.viewParent
		switch(this.currentIndex){
			case 0:
				this.delayDo(function(){
					_viewParent.find('.tranlate_wrapper').find('[class^=p1_f1]').each(function(index,ele){
						var ty =  parseFloat($(ele).data('rh'))+REM_WIN_HEIGHT*1.5
						changeTransform($(ele), 'translateY(-'+ty+'rem)')
					})
				}, 1000)
				
				_viewParent.find('.tranlate_wrapper').find('[class^=p1_f2]').each(function(index,ele){
					var ty =  0
					changeTransform($(ele), 'translateY(-'+ty+'rem)')
				})
				break;
			case 1:
				if(forward=='next'){
					_viewParent.find('.tranlate_wrapper').find('[class^=p1_f1]').each(function(index,ele){
						var ty =  3*REM_WIN_HEIGHT
						changeTransform($(ele), 'translateY(-'+ty+'rem)')
					})
				} else {
					_viewParent.find('.tranlate_wrapper').find('[class^=p1_f1]').each(function(index,ele){
						var ty =  0
						changeTransform($(ele), 'translateY(-'+ty+'rem)')
					})
				}
				this.delayDo(function(){
					_viewParent.find('.tranlate_wrapper').find('[class^=p1_f2]').each(function(index,ele){
						var ty =  parseFloat($(ele).data('rh'))+REM_WIN_HEIGHT*1.5
						changeTransform($(ele), 'translateY(-'+ty+'rem)')
					})
				},1000)
				break;
			default:
				break;
		}
	}
}

function changeTransform(ele, val){
	$(ele).css({
		'transform':val
		,'-webkit-transform':val
	})
}

//禁止默认滑动事件
document.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);


//初始化层级控制
$('.main_container').on('swipeUp', function(){
	viewController.next()
}).on('swipeDown', function(){
	viewController.prev()
}).on('tap', '.p1f2_pag', function(event) {
	event.preventDefault();
	$(this).toggleClass('show');
});

window.onload = function(){
	$('#loading').remove()
	viewController.init(0)
}
