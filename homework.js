var express = require('express');

var app = express();



app.get('/', function (req, res) {

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

	console.log(req.hostname);

	var html='<head>'

	+ '<title>�γ�ѡ��</title>'

	+ '</head>'

	+'<body>'

	+'<form action="/voter" method="get">'

	+'<fieldset>'

		+'<legend>��ѡ��γ�</legend>'

		+'<input type="radio" name="course" value="1">����<br>'

		+'<input type="radio" name="course" value="2">��ѧ<br>'

		+'<input type="radio" name="course" value="3">��ʷ<br><br>'



		+'<input type="submit" value="�ύ"><br>'



		+'<p>���"�ύ"��ť��ͶƱ����������͵���������</p>'

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

	if(req.query.course == '1'){res.write('��ѡ��������лл����֧������ϣ�\n');}

	if(req.query.course == '2'){res.write('��ѡ���˻�ѧ��лл����֧������ϣ�\n');}

	if(req.query.course == '3'){res.write('��ѡ������ʷ��лл����֧������ϣ�\n');}

	

	res.end();

})



app.get('/list_user', function (req, res) {

   console.log("/list_user GET ����");

   res.send('�û��б�ҳ��');

})



var server = app.listen(3000, function () {

  var host = server.address().address;

  var port = server.address().port;



  console.log('Example app listening at http://%s:%s', host, port);

});