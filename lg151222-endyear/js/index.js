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

if(window.DeviceMotionEvent) { 
	;(function(){ 
	    var speed = 25;  
	    var x = y = z = lastX = lastY = lastZ = 0;
	    window.addEventListener('devicemotion', function(){  
	        var acceleration =event.accelerationIncludingGravity;  
	        x = acceleration.x;  
	        y = acceleration.y;  
	        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {  
	        	$(window).trigger('shake')
	        }  
	        lastX = x;  
	        lastY = y;  
	    }, false); 
	})()
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

		//翻页提示
		$('.next_tip').hide()

		//后几页的背景处理
		if(this.currentIndex==2){
			hideDtds.push(fadeIn($('.after_3_bg'),0,0,0.6,0))
		} else if(this.currentIndex<2){
			$('.after_3_bg').css('opacity',0)
		}

		//第九页下载处理
		if(this.currentIndex===8){
			$('.p1_f9_download').show()
		} else {
			$('.p1_f9_download').hide()
		}

		//时钟处理
		if(this.currentIndex==1 || this.currentIndex==6){
			$('.clock_wrapper').hide().css('opacity',0).removeClass('show33 show45 show70 show99')
		}

		//摇一摇初始化
		disShake()

		disableEvents()
		$.when.apply(this, hideDtds).done(function(){
			var $eles = _viewParent.find('[class^=p1_f'+(this.currentIndex+1)+']')
			var targets = getMoveTargets($eles)
			var dtds = []
			targets.forEach(function(target){
				if(target[0].data('type')=='fadein'){
					dtds.push(fadeIn.apply(target[0],target).done(function(ele){
						$(ele).addClass('on_show')
					}))
				} else {
					dtds.push(moveUp.apply(target[0],target).done(function(ele){
						$(ele).addClass('on_show')
					}))
				}
			})
			var commonDtds = $.when.apply(this, dtds).done(function(){
				initEvents()
				$('.clock_wrapper').removeClass('show33 show45 show70 show99')
				switch(this.currentIndex){
					case 0:
						break;
					case 1:
						break;
					case 2:
						commonDtds.done(function(){
							$('.clock_wrapper').addClass('show33')
						})
						break;
					case 3:
						commonDtds.done(function(){
							$('.clock_wrapper').addClass('show45')
						})
						break;
					case 4:
						commonDtds.done(function(){
							$('.clock_wrapper').addClass('show70')
						})
						break;
					case 5:
						commonDtds.done(function(){
							$('.clock_wrapper').addClass('show99')
						})
						break;
					case 6:
						break;
					case 7:
						break;
					case 8:
						initShake()
						break;
					default:
						break;
				}
				if(this.currentIndex<this.length-1){
					$('.next_tip').show()
				}
			}.bind(this))
			switch(this.currentIndex){
				case 2:
				case 3:
				case 4:
				case 5:
					$('.clock_wrapper').css('opacity',1).show()
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
    setTimeout(_move, delay*1000)
    //fortest
    // doneFrameCount = frames
    // _move()
    return dtd.promise();
}

function fadeIn(ele, sY, tY, sTime, delay, opts){
	var _this = this
	var dtd = $.Deferred();
 	var perT = 1000/60
 	var msTime = sTime*1000
 	var frames = (msTime/perT)|0
 	var doneFrameCount = 0

	ele.css({
 		'opacity':0
 	})
 	
 	changeTransform(ele, 'translateY(-'+tY+'rem)')
 	function _show(){
 		if(doneFrameCount<frames){
 			ele.css({
 				'opacity':doneFrameCount/frames
 			})
 			window.requestAnimFrame(_show)
 		} else {
 			dtd.resolve(_this)
 		}
		doneFrameCount++
 	}
 	setTimeout(_show, delay*1000)
 	
 	//fortest
 	// ele.css({
 	// 	'opacity':1
 	// })
 	// dtd.resolve(_this)

 	return dtd
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
		$('.p1_f2_tip').remove()
	}).on('tap', '.next_btn', function(event) {
		event.preventDefault();
		viewController.next()
	}).on('tap', '.p1_f9_sharebtn', function(event) {
		event.preventDefault();
		//分享引导层
		$('#share_masker').show()
	});
}
initEvents()

function disableEvents(){
	$('.main_container').off('swipeUp swipeDown tap');
}

window.onload = function(){
	endLoading()
}

//加载资源
var loadingOver = false
function beginLoading(cb){
	var currPer = 0
	var loadingId = setInterval(function(){
		if(loadingOver){
			clearInterval(loadingId)
			currPer=100;
			setTimeout(function(){
				cb && cb()
			},300)
		}
		if(currPer<99) currPer++;
		$('#loading').find('.process').html(currPer+'%')
	}, 70)
}
function endLoading(cb){
	loadingOver = true
}
beginLoading(function(){
	$('#loading').remove()
	viewController.init(0)
})

//最后一页摇一摇动作
function initShake(){
	$(window).one('shake', function(event) {
		event.preventDefault();
		$('#shake_tip').show()
		disableEvents()
		setTimeout(function(){
			window.setRandomWantText()
			initShake()
			initEvents()
		}, 1000)
	});
}
function disShake(){
	$(window).off('shake')
}

$('.p1_f9_download').on('tap', function(event) {
	//下载app
	location.href = $(this).data('href')
}).on('click', '.close_btn', function(event) {
	event.preventDefault();
	$('.p1_f9_download').remove()
	return false;
});

$('#share_masker').on('tap', function(event) {
	event.preventDefault();
	$(this).hide()
});

//f1 txt change
;(function(){
	var $p1txt = $('.p1_f1_txt')
	var $txt1 = $p1txt.find('.txt1')
		,$txt2 = $p1txt.find('.txt2')
	var show1 = false
	function _change(){
		show1 = !show1
		if(show1){
			$txt1.hide()
			$txt2.show()
		} else {
			$txt1.show()
			$txt2.hide()
		}
		setTimeout(_change,200)
	}
	_change()
})();

//f2 txt change
;(function(){
	var $p1txt = $('.p1_f2_txt')
	var $txt1 = $p1txt.find('.txt1')
		,$txt2 = $p1txt.find('.txt2')
	var show1 = false
	function _change(){
		show1 = !show1
		if(show1){
			$txt1.hide()
			$txt2.show()
		} else {
			$txt1.show()
			$txt2.hide()
		}
		setTimeout(_change,200)
	}
	_change()
})();

window.setRandomWantText = function(){
	var txt = ''
	if(window.defaultTexts){
		txt = defaultTexts[(Math.random()*defaultTexts.length)|0]
	}
	txt = txt || '多陪陪父母'
	$('#want_input').val(txt)
}

window.initUser = function(name, head_url){
	name = name || 'sky'
	head_url = head_url || ''
}