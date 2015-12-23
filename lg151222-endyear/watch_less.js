var fs = require('fs')
	,exec = require('child_process').exec
fs.watch('./less', { persistent: true, interval: 500 }, function(e, filename){
	console.log(filename,e)
	var file = filename.slice(0,-5)
	var s = 'lessc ./less/'+filename+' ./css/'+file+'.css'
	exec(s, function(){
		// console.log(arguments)
	})
	// console.log(s)

})
