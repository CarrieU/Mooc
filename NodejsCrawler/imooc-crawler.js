var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.bttiantang.org';

/*
**过滤html源码，得到电影信息
*/
function filterFilms(html){
	//setup cheerio : npm install cheerio  (like jquery for js)
	var $ = cheerio.load(html);

	var filmsData = $('.ml').find('.item');

	var films = [];
	filmsData.each(function(itme){
		var film = $(this);
		var title = $(film.find('.title'));

		var publishDate = title.find('p.tt').find('font').eq(0).html();
		var filmName = title.find('p.tt').find('a').find('font').html();
		filmName = filmName.replace('<i>/','_').replace('</i>','');
		var filmOtherName = title.find('p').eq(1).find('a').html();
		var filmScore = title.find('p.rt').find('strong').html();
		var filmSrc = url + title.find('p.tt').find('a').attr('href');
		var id = title.find('p.tt').find('a').attr('href').split('/')[2].split('.')[0];
		//console.log(publishDate+"_"+filmOtherName+"/"+filmName +" (豆瓣："+filmScore+")"+id);

		films.push({
			id : id,
			filmName : filmName
		});
	});
	return films;
}

function printFilms(films){
	films.forEach(function(item){
		console.log(item.id);
	});
}

http.get(url, function(res){
	var html = '';
	res.on('data', function(data){
		html += data;
	});

	res.on('end', function(){
		var films = filterFilms(html);
		printFilms(films);
	});
}).on('error', function(){
	console.log('获取数据失败！');
});