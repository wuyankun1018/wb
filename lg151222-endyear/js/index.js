var WIN_HEIGHT = $(window).height() //页面高度
	,WIN_WIDTH = $(window).width() //页面宽度
	,REM_WIN_WIDTH = 7.5
	,REM_WIN_HEIGHT = REM_WIN_WIDTH*WIN_HEIGHT/WIN_WIDTH
	,WIN_OH = REM_WIN_HEIGHT>12?REM_WIN_HEIGHT:12
function transToRem(pxlen){
	return REM_WIN_WIDTH*pxlen/WIN_WIDTH+0.01
}

//屏幕尺寸适配
;(function(){
	$('[data-rt]').each(function(index, ele){
		var $this = $(ele)
		$this.data('oheight',$(this).height())
	})
	$('[data-oh]').each(function(index, ele){
		var $this = $(ele)
		var oh = parseFloat($this.data('oh'))
		if(oh>REM_WIN_HEIGHT){
			var scale = REM_WIN_HEIGHT/oh
			var trueH = $this.height()
			var trueW = $this.width()
			var ty = transToRem((trueH-WIN_HEIGHT)/2)
			var tx = transToRem(trueW*(1-scale)/2)
			changeTransform($this,'translateY(-'+ty+'rem) scale('+scale+')')
			$(this).data('scale', scale)
			$this.find('[data-align]').each(function(i, el){
				var $el = $(el)
					,align = $el.data('align')
				align.split(' ').forEach(function(al){
					if(al=='left'){
						$el.css({
							'margin-left':-tx+'rem'
						})
					}
				})
			})
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
	,reloadView: function(forward){
		forward = forward || 'next'
		var _viewParent = this.viewParent
		switch(this.currentIndex){
			case 0:
				hideAll()
				show(_viewParent.find('[class^=p1_f1]'))
				break;
			case 1:
				hideAll()
				show(_viewParent.find('[class^=p1_f2]'))
				break;
			case 2:
				hideAll()
				show(_viewParent.find('[class^=p1_f3]'))
				break;
			case 3:
				hideAll()
				show(_viewParent.find('[class^=p1_f4]'))
				break;
			default:
				break;
		}
		function hideAll(){
			_viewParent.find('[class^=p1_]').each(function(index, ele){
				var $item = $(ele)
				var oheight = $item.data('oheight') || 800
				var ty =  WIN_OH+transToRem(oheight)
				changeTransform($item, 'translateY(-'+ty+'rem)')
			})
		}
		function show($items){
			$items.each(function(index,ele){
				var $this = $(ele)
				var rt = $this.data('rt') || 0
				var ty =  parseFloat(rt)+WIN_OH
				changeTransform($this, 'translateY(-'+ty+'rem)')
			})
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
	$(this).addClass('show');
});

window.onload = function(){
	$('#loading').remove()
	viewController.init(0)
}
