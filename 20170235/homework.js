var express = require('express');

var app = express();



app.get('/', function (req, res) {

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

	console.log(req.hostname);

	var html='<head>'

	+ '<title>课程选择</title>'

	+ '</head>'

	+'<body>'

	+'<form action="/voter" method="get">'

	+'<fieldset>'

		+'<legend>请选择课程</legend>'

		+'<input type="radio" name="course" value="1">物理<br>'

		+'<input type="radio" name="course" value="2">化学<br>'

		+'<input type="radio" name="course" value="3">历史<br><br>'



		+'<input type="submit" value="提交"><br>'



		+'<p>点击"提交"按钮，投票结果将被发送到服务器上</p>'

	+'</fieldset>'

	+'</form>'

+'</body>'



+'</html>'

res.write(html);

res.end();

})



app.get('/voter',function(req,res){

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

	console.log(req.query);

	if(req.query.course == '1'){res.write('您选择了物理，谢谢您的支持与配合！\n');}

	if(req.query.course == '2'){res.write('您选择了化学，谢谢您的支持与配合！\n');}

	if(req.query.course == '3'){res.write('您选择了历史，谢谢您的支持与配合！\n');}

	

	res.end();

})



app.get('/list_user', function (req, res) {

   console.log("/list_user GET 请求");

   res.send('用户列表页面');

})



var server = app.listen(3000, function () {

  var host = server.address().address;

  var port = server.address().port;



  console.log('Example app listening at http://%s:%s', host, port);

});