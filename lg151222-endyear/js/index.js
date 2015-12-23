var WIN_HEIGHT = $(window).height() //页面高度
	,WIN_WIDTH = $(window).width() //页面宽度
	,REM_WIN_WIDTH = 7.5
	,REM_WIN_HEIGHT = REM_WIN_WIDTH*WIN_HEIGHT/WIN_WIDTH

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
		this.reloadView()
	}
	,prev: function(){
		//回到上一层
		this.currentIndex--
		if(this.currentIndex<0) 
			this.currentIndex=0;
		this.reloadView()
	}
	,reloadView: function(){
		switch(this.currentIndex){
			case 0:
				// this.viewParent.find('.page1_wrapper').show()
				this.viewParent.find('.tranlate_wrapper').find('[class^=p1]').each(function(index,ele){
					var ty =  parseFloat($(ele).data('rh'))+REM_WIN_HEIGHT
					changeTransform($(ele), 'translateY(-'+ty+'rem)')
				})
				changeTransform(this.viewParent.find('.tranlate_wrapper'), 'translateY(0)')
				break;
			case 1:
				// this.viewParent.find('.page1_wrapper').show()
				changeTransform(this.viewParent.find('.tranlate_wrapper'), 'translateY(-100%)')
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
viewController.init(0)
$('.main_container').on('swipeUp', function(){
	viewController.next()
}).on('swipeDown', function(){
	viewController.prev()
})
