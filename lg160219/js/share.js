window.shareTxt = '2016，你靠什么走向人生巅峰？'
window.shareLink = location.href.split('?')[0].replace('/share.html','/index.html')

window.onload = function(){
	$('.loading').remove()
	$('.p2_con').addClass('p2Action')
}


var randomDatas = [
	[
		'精明'
		,'灵机一动'
		,'就心生一计'
		,'智多星也不过如此吧'
	],[
		'热心'
		,'如果雷锋在世'
		,'估计也得喊你一句'
		,'“大师兄”'
	],[
		'力量'
		,'满满的power'
		,'生来就仿佛君临天下'
		,'忍不住想要被你临幸'
	],[
		'任性'
		,'总是我行我素的你'
		,'真的是'
		,'帅的没边了'
	],[
		'智慧'
		,'随便挤一颗脑细胞'
		,'就能抵上'
		,'千军万马'
	],[
		'才气'
		,'明晃晃的光芒'
		,'已经闪的让众人'
		,'睁不开眼'
	],[
		'逗逼'
		,'拥有自带弹幕的技能'
		,'让人看了就莫名开心'
	],[
		'勇气'
		,'一颗勇于担当的心'
		,'不知让多少人沉醉'
	],[
		'贵人'
		,'无数的大咖'
		,'等被你吸引过来'
		,'忍不住提携你'
	],[
		'拍马屁'
		,'这种失传已久的技能'
		,'已被你运用的'
		,'炉火纯青'
	],[
		'乐观'
		,'就算是众人都不理解'
		,'你依然笑对一切'
	],[
		'颜值'
		,'感觉你稍微画一下妆'
		,'就会美的不要不要的'
	],[
		'运气'
		,'出门左拐买彩票'
		,'一买一个中'
	],[
		'钞票'
		,'想买啥就买啥'
		,'钱对你来说'
		,'就只是个数字'
	],[
		'喜感'
		,'你一出场'
		,'别人就会感到'
		,'莫名的开心'
	],[
		'伙伴'
		,'有一帮可靠的战友在'
		,'路就是越走越顺'
	],[
		'身材'
		,'总忍不住'
		,'让人透过衣衫'
		,'去想入非非'
	],[
		'节操'
		,'在别人节操'
		,'都已欠费的情况下'
		,'你却依然保持满额'
	],[
		'雨露均沾'
		,'你那啥也不挑的个性'
		,'真是让众人'
		,'都得到了实惠'
	],[
		'自省'
		,'你就像一位哲学家'
		,'总能发现自己'
		,'长处与短板'
	],[
		'天赋'
		,'你已然发现了自己'
		,'的小宇宙，并且成功'
		,'点燃了它'
	],[
		'梦想'
		,'你很清楚'
		,'清晨叫醒你的不是闹钟'
		,'而是那熊熊的梦想'
	],[
		'野心'
		,'世界有多大'
		,'你的心就有多大'
	],[
		'专业'
		,'在你的领域'
		,'你排第二'
		,'那没人敢称第一'
	],[
		'大气'
		,'跟在你的身后'
		,'总有数不清的钞票'
		,'可以捡'
	]
]

function getUrlParam(name){  
     var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");  
     var matcher = pattern.exec(location.href);  
     var items = null;  
     if(null != matcher){  
             try{  
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));  
             }catch(e){  
                     try{  
                             items = decodeURIComponent(matcher[1]);  
                     }catch(e){  
                             items = matcher[1];  
                     }  
             }  
     }  
     return items || '';  
} 

var name = getUrlParam('rname').replace(/</g,'&lt;').replace(/>/g,'&gt;')
var data = randomDatas[getUrlParam('rindex')|0]
$(".p2_name").html(name)
$(".p2_result").html(data[0])
$(".desc_line1").html(data[1])
$(".desc_line2").html(data[2])
$(".desc_line3").html(data[3]||'')


$('.share_btn').on('click', function(event) {
	location.href = location.href.split('?')[0].replace('/share.html','/index.html')
});
