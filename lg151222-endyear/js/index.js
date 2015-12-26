var WIN_HEIGHT = $(window).height() //页面高度
	,WIN_WIDTH = $(window).width() //页面宽度
	,REM_WIN_WIDTH = 7.5
	,REM_WIN_HEIGHT = REM_WIN_WIDTH*WIN_HEIGHT/WIN_WIDTH
	// ,WIN_OH = REM_WIN_HEIGHT>12?REM_WIN_HEIGHT:12
function transToRem(pxlen){
	return REM_WIN_WIDTH*pxlen/WIN_WIDTH+0.01
}
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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
			var scale = WIN_HEIGHT/$this.height()
			var trueH = $this.height()
			var trueW = $this.width()
			var tyPx = ((1-scale)*trueH)/2
			var txPx = trueW*(1-scale)/2
			changeTransform($this,'translateY(-'+tyPx+'px) scale('+scale+')')
			$(this).data('scale', scale)
			$this.find('[data-align]').each(function(i, el){
				var $el = $(el)
					,align = $el.data('align')
				align.split(' ').forEach(function(al){
					if(al=='left'){
						$el.css({
							'margin-left':-(txPx/scale)+'px'
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
		var hideDtds = hideAll()
		disableEvents()
		$.when.apply(this, hideDtds).done(function(){
			var $eles = _viewParent.find('[class^=p1_f'+(this.currentIndex+1)+']')
			// $eles.addClass('on_show')
			var targets = getMoveTargets($eles)
			var dtds = []
			targets.forEach(function(target){
				dtds.push(moveUp.apply(target[0],target).done(function(ele){
					$(ele).addClass('on_show')
				}))
			})
			$.when.apply(this, dtds).done(function(){
				initEvents()
			})
			switch(this.currentIndex){
				case 0:
					break;
				case 1:
					break;
				case 2:
					// show(_viewParent.find('[class^=p1_f3]'))
					break;
				case 3:
					// show(_viewParent.find('[class^=p1_f4]'))
					break;
				case 4:
					// show(_viewParent.find('[class^=p1_f5]'))
					break;
				case 5:
					// show(_viewParent.find('[class^=p1_f6]'))
					break;
				case 6:
					// show(_viewParent.find('[class^=p1_f7]'))
					break;
				case 7:
					// show(_viewParent.find('[class^=p1_f8]'))
					break;
				case 8:
					// show(_viewParent.find('[class^=p1_f9]'))
					break;
				default:
					break;
			}
		}.bind(this))
		
		function hideAll(){
			var dtds = []
			_viewParent.find('.on_show').each(function(index, ele){
				var $item = $(ele)
				var scale = $item.parents('.oh_wrapper').data('scale') || 1
				var oheight = parseFloat($item.data('oheight')) || $item.height()
				var ty = transToRem(oheight+WIN_HEIGHT)
				$item.removeClass('on_show')
				dtds.push(moveUp($item, -getCurrTy($item),ty/scale, 0.6, 0))
				// changeTransform($item, 'translateY(-'+(ty/scale)+'rem)')
			})
			return dtds
		}
		function show($items){
			$items.each(function(index,ele){
				var $this = $(ele)
				var scale = $this.parents('.oh_wrapper').data('scale') || 1
				var oh = REM_WIN_HEIGHT
				if(scale!==1){
					oh = parseFloat($this.parents('.oh_wrapper').data('oh'))
				}
				var rt = $this.data('rt') || 0
				var ty =  parseFloat(rt)+oh
				changeTransform($this, 'translateY(-'+ty+'rem)')
			})
		}
		function getMoveTargets($items){
			var moveTargets = []
			$items.each(function(index,ele){
				var $this = $(ele)
				var scale = $this.parents('.oh_wrapper').data('scale') || 1
				var oh = REM_WIN_HEIGHT
				if(scale!==1){
					oh = parseFloat($this.parents('.oh_wrapper').data('oh'))
				}
				var rt = $this.data('rt') || 0
				var ty =  parseFloat(rt)+oh
				var delayT = parseFloat($this.data('delay')) || 0
				var keepT = parseFloat($this.data('time')) || 1
				moveTargets.push([
					$this
					,0 //start ty
					,ty
					,keepT
					,delayT
				])
			})
			return moveTargets
		}
	}
}

function changeTransform(ele, val){
	$(ele).css({
		'transform':val
		,'-webkit-transform':val
	})
}

function moveUp(ele, sY, tY, sTime, delay){
	var _this = this
	sY = sY ||0
 	var dtd = $.Deferred();
 	var perT = 1000/60
 	var msTime = sTime*1000
 	var frames = (msTime/perT)|0
 	delay = delay||0
 	var doneFrameCount = 0
 	function _move(){
 		if(doneFrameCount<frames){
 			var len = easeInOut(doneFrameCount,sY,tY,frames)
 			changeTransform(ele, 'translateY(-'+len+'rem)')
 			window.requestAnimFrame(_move)
 		} else {
 			changeTransform(ele, 'translateY(-'+tY+'rem)')
 			dtd.resolve(_this)
 		}
 		doneFrameCount++
 	}
 	function easeInOut(t, b, c, d) {
 		//t => time(初始记步次数)   b => begin(初始位置)   c => change(变化量)   d => duration(持续次数)
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return - c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    // setTimeout(_move, delay*1000)
    //fortest
    doneFrameCount = frames
    _move()
    return dtd.promise();
}

function getCurrTy(ele){
	var transform = ele.css('transform')
	if(!transform || transform.indexOf('translateY')==-1) return 0;
	return parseFloat(transform.split('translateY(')[1])
}

//禁止默认滑动事件
document.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);




function initEvents(){
	//初始化层级控制
	$('.main_container').on('swipeUp', function(){
		viewController.next()
	}).on('swipeDown', function(){
		viewController.prev()
	}).on('tap', '.p1f2_pag', function(event) {
		event.preventDefault();
		$(this).addClass('show');
	}).on('tap', '.next_btn', function(event) {
		event.preventDefault();
		viewController.next()
	});
}
initEvents()

function disableEvents(){
	$('.main_container').off('swipeUp swipeDown tap');
}

window.onload = function(){
	$('#loading').remove()
	viewController.init(0)
}
