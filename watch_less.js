var fs = require('fs')
	,exec = require('child_process').exec
fs.watch('/Users/wuyankun/Desktop/wdqc/less', { persistent: true, interval: 500 }, function(e, filename){
	console.log(filename,e)
	var file = filename.slice(0,-5)
	var s = 'lessc /Users/wuyankun/Desktop/wdqc/less/'+filename+' /Users/wuyankun/Desktop/wdqc/css/'+file+'.css'
	exec(s, function(){
		// console.log(arguments)
	})
	// console.log(s)

})