var endStamp = 1450627200000 // new Date('2015-12-21 00:00:00')

var hourWrapper = document.getElementById('hour_w')
	,minuteWrapper = document.getElementById('minute_w')
	,secondWrapper = document.getElementById('second_w')

function setCountDown(hour, minute, second){
	hourWrapper.innerHTML = hour
	minuteWrapper.innerHTML = minute
	secondWrapper.innerHTML = second
}

function freshCountDown(){
	var nowStamp = (new Date()).getTime()
	var leftTime = parseInt((endStamp - nowStamp)/1000)
	var hour, minute, second
	hour = filter(leftTime/3600)
	minute = filter((leftTime%3600)/60)
	second = filter((leftTime%3600)%60)
	setCountDown(hour, minute, second)
	if(leftTime>0){
		setTimeout(freshCountDown, 1000)
	} else {
		go()
	}
	function filter(num){
		num = parseInt(num)
		if(isNaN(num)){
			return '00';
		}
		if(num<10){
			num = '0' + num
		}
		return num+''
	}

}

function go(){
	setTimeout(function(){
		location.reload()
	}, 1000)
}

freshCountDown()