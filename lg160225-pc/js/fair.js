$(function(){
	var fairConList = {
		shejiao:[]
		,o2o:[
			{
				name:'住百家'
				,link:'http://www.lagou.com/gongsi/14289.html'
				,logo:'http://www.lagou.com/i/image/M00/08/6B/Cgp3O1bP8q6ALp1XAAA2Ip5lGmM215.png'
			}
			,{
				name:'月亮盒子'
				,link:'http://www.lagou.com/gongsi/21261.html'
				,logo:'http://www.lagou.com/image1/M00/00/27/Cgo8PFTUWIiAYloQAACBMKSQgGo714.jpg'
			}

		]
		,dianshang:[
			{
				name:'网利宝'
				,link:'http://www.lagou.com/gongsi/14819.html'
				,logo:'http://www.lagou.com/image2/M00/06/D9/CgqLKVX7jXaAXSQRAAC_V2HmlQw461.png'
			}
			,{
				name:'本来生活'
				,link:'http://www.lagou.com/gongsi/19965.html'
				,logo:'http://www.lagou.com/image1/M00/00/25/CgYXBlTUWH-AUw1dAAB0z8A1vc4545.JPG'
			}
			,{
				name:'瑞恩珠宝'
				,link:''
				,logo:'images/ruien.jpg'
			}
		]
		,shangye:[
			{
				name:'硬蛋'
				,link:'http://www.lagou.com/gongsi/105665.html'
				,logo:'http://www.lagou.com/image2/M00/15/0B/CgpzWlZBmbuAIja8AAApnzLIevk62.jpeg?cc=0.4824546230956912'
			}
			,{
				name:'极客帮'
				,link:'http://www.lagou.com/gongsi/109583.html'
				,logo:'http://www.lagou.com/i/image/M00/01/58/CgqKkVZn7rOAfqIBAAEKxNR3cQc765.png'
			}
			,{
				name:'3w'
				,link:'http://www.lagou.com/gongsi/114386.html'
				,logo:'http://www.lagou.com/i/image/M00/03/AB/CgqKkVbCjLqAMqcbAABBTccnOFw876.png'
			}
		]
		,shenghuo:[
			{
				name:'在行'
				,link:''
				,logo:'images/zaihang.jpg'
			}
			,{
				name:'简理财'
				,link:'http://www.lagou.com/gongsi/116617.html'
				,logo:'http://www.lagou.com/i/image/M00/08/75/Cgp3O1bP_MGAIS_CAADpO_Xp9_0457.png'
			}
			,{
				name:'界面'
				,link:''
				,logo:'images/jiemian.jpg'
			}
			,{
				name:'微在'
				,link:'http://www.lagou.com/gongsi/9929.html'
				,logo:'http://www.lagou.com/image2/M00/06/FC/CgqLKVX75cCACHzqAAB8xP6_7NU997.jpg'
			}
		]
		,xingqiu:[
			{
				name:'36氪'
				,link:'http://www.lagou.com/gongsi/6800.html'
				,logo:'http://www.lagou.com/image1/M00/00/0E/Cgo8PFTUWCaASxOHAABpnD0-I-g402.png'
			}
		]
	}
	var fairConHtml = ''
	var keyArr = ['shejiao','o2o','dianshang','shangye','shenghuo','xingqiu']
	for(var i=0;i<keyArr.length;i++){
		$.each(fairConList[keyArr[i]], function(index, el) {
			fairConHtml+='<li data-type="'+keyArr[i]+'">'
			fairConHtml+='<a '+(el.link?'href="'+el.link+'"':'')+' target="_blank">'
			fairConHtml+='<span class="pic"><img src="'+el.logo+'" /></span>'
			fairConHtml+='<span class="tle">'+el.name+'</span>'
			fairConHtml+='</a>'
			fairConHtml+='</li>'
		});
	}
	$('.con_show .con').html(fairConHtml)
	//梦想者市集轮播
	;(function(){
		var width = $('.con_show').find('li:first').outerWidth(true)
		var ul = $('.fair_con').find('ul.con')
		var length = ul.children().length
		var p =ul.children().clone()
		var n =ul.children().clone()
		$('.con_show').find('li').addClass('curr').first().addClass('start')
		ul.append(n)
		ul.prepend(p)
		ul.css({
			marginLeft: -width*length
		})

		var actIndex = 0
		$('.fair_con').on('click', '.arrow_l1', function(event) {
			if(ul.is(':animated')) return;
			actIndex--;
			moveTo()
		}).on('click', '.arrow_r1', function(event) {
			if(ul.is(':animated')) return;
			actIndex++;
			moveTo()
		})

		$('.fair').find('.tab').on('click', 'a', function(event) {
			$(this).addClass('active').siblings().removeClass('active')
			var type = $(this).data('type')
			var index = ul.find('[data-type='+type+'].curr').first().index()
			if(index<0) return;
			actIndex = index-length
			moveTo()
		});

		function moveTo(){
			//actIndex min:0 max:length-6
			var currMl = ul.css('marginLeft')|0
			if(actIndex<0){
				ul.css({
					marginLeft: -width*length*2+currMl
				})
				actIndex = actIndex+length
			} else if(actIndex>length){
				ul.css({
					marginLeft: -width*length+currMl
				})
				actIndex = actIndex-length
			}
			var start = ul.find('li.start').index()
			var index = start+actIndex
			ul.stop(true,true).animate({
				marginLeft: -width*index
			},600, function() {
			})
		}

	})()

	//嘉宾轮播
	;(function(){
		var width = $('.guest').find('li:first').outerWidth(true)
		var ul = $('.guest').find('ul.con')
		var length = ul.children().length
		var p =ul.children().clone()
		var n =ul.children().clone()
		$('.guest').find('li').addClass('curr').first().addClass('start')
		ul.append(n)
		ul.prepend(p)
		ul.css({
			marginLeft: -width*length
		})

		var actIndex = 0
		$('.guest').on('click', '.arrow_l2', function(event) {
			if(ul.is(':animated')) return;
			actIndex--;
			moveTo()
		}).on('click', '.arrow_r2', function(event) {
			if(ul.is(':animated')) return;
			actIndex++;
			moveTo()
		})

		$('.guest').find('.tab').on('click', 'a', function(event) {
			$(this).addClass('active').siblings().removeClass('active')
			var type = $(this).data('type')
			var index = ul.find('[data-type='+type+'].curr').first().index()
			if(index<0) return;
			actIndex = index-length
			moveTo()
		});

		function moveTo(){
			//actIndex min:0 max:length-6
			var currMl = ul.css('marginLeft')|0
			if(actIndex<0){
				ul.css({
					marginLeft: -width*length*2+currMl
				})
				actIndex = actIndex+length
			} else if(actIndex>length){
				ul.css({
					marginLeft: -width*length+currMl
				})
				actIndex = actIndex-length
			}
			var start = ul.find('li.start').index()
			var index = start+actIndex
			ul.stop(true,true).animate({
				marginLeft: -width*index
			},600, function() {
			})
			autoMove()
		}

		var aid = 0
		function autoMove(){
			clearTimeout(aid)
			aid = setTimeout(function(){
				actIndex++
				moveTo()
			}, 5000)
		}
		autoMove()

	})()
})