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

var pageViewController = new function(){
	var $parent = $('.page_container')
	var currIndex = 0
	var pageLength = $parent.children('.page_item').length

	this.next = function(){
		currIndex++
		if(currIndex>pageLength-1){
			currIndex--;
			return;
		}
		reloadView((currIndex-1)*100)
	}

	this.prev = function(){
		currIndex--
		if(currIndex<0){
			currIndex=0
			return;
		}
		reloadView((currIndex+1)*100)
	}

	var isMove = false

	function reloadView(start){
		// var percentVal = -currIndex*100 + '%'
		// var tranlateY = 'translateY('+percentVal+')'
		// $parent.css({
		// 	'transform':tranlateY
		// 	,'-webkit-transform':tranlateY
		// })
		if(isMove) return;
		isMove = true;
		$parent.find('.page_item').removeClass('show_ani').eq(currIndex).addClass('show_ani')
		$('#turn_page_tip').removeClass('show').show()
		moveUp($parent, start, currIndex*100, 0.6, 0).done(function(){
			if(currIndex !== pageLength-1)
				$('#turn_page_tip').addClass('show')
			else
				$('#turn_page_tip').hide()
			isMove = false;
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
	 	var change = tY - sY
	 	function _move(){
	 		if(doneFrameCount<frames){
	 			var len = easeInOut(doneFrameCount,sY,change,frames)
	 			changeTranslateY(len)
	 			window.requestAnimFrame(_move)
	 		} else {
	 			changeTranslateY(tY)
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
	    // fortest
	    // doneFrameCount = frames
	    // _move()
	    function changeTranslateY(percentVal){
	    	var percentVal = -percentVal+ '%'
			var tranlateY = 'translateY('+percentVal+')'
	    	ele.css({
				'transform':tranlateY
				,'-webkit-transform':tranlateY
			})
	    }
	    return dtd.promise();
	}
}
//禁止默认滑动事件
document.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);
$('.main_container').on('swipeUp', function(event) {
	event.preventDefault();
	pageViewController.next()
}).on('swipeDown', function(event) {
	event.preventDefault();
	pageViewController.prev()
});

$('.share.btn').on('tap', function(event) {
	$('#share_masker').show()
});

$('#share_masker').on('tap', function(event) {
	event.preventDefault();
	$(this).hide()
});

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

//微信分享
	var datas = {
	title: "不好意思，1月12日，五棵松体育馆因为我们又堵了。",
	desc: "拉勾网2015年终盛典—野心时代·拉勾之夜！",
	imgUrl: "http://ca.lagou.com/template/lagouzhiye/image/share.jpg",
	goToUrl: false
}
share(datas);

window.onload= function(){
	$('.dot_line').addClass('ani')
	// var html = $('#svg_tpl').html()+$('#svg_tpl2').html()
	// $('.page_item').append(html)
}
