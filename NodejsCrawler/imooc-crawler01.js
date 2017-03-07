var http = require('http');
var url = 'http://www.bttiantang.org/index-0.html';

http.get(url, function(res){
	var html = '';
	res.on('data', function(data){
		html += data;
	});

	res.on('end', function(){
		console.log(html);
	});
}).on('error', function(){
	console.log('获取数据失败！');
});