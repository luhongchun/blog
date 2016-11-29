//校网模拟登陆
var superagent = require('superagent'); //一个的请求代理模块api，可处理get,post,put,delete,head请求
var cheerio = require('cheerio'); //装载已爬取的html网页，类似jQuery，方便获取网页指定数据。
var nodecr = require('nodecr'); //解析验证码
var tools = require('./tools');
var fs = require('fs');
var loginUrl = '*****'; //登录网址
var validateImgUrl = '******'; //验证码网址
var Cookies;
var username = * * * * * ;
var password = * * * * * ;
//initial session here
superagent.get(loginUrl).end(function (err, res) {
	if (err) {
		console.log('connection failure');
	}
	Cookies = res.headers['set-cookie'].pop().split(';')[0];
	//console.log(Cookies);
	//superagent validation image
	var req = superagent.get(validateImgUrl); //获取验证码图片
	req.set('Cookie', Cookies); //设置cookie，保证同一个会话验证码
	req.end(function (err1, res1) {
		if (err1) {
			console.log("request code failure");
		}
		//验证码解析
		var s64 = Buffer(res1.body).toString('base64'); //将获取数据流转为buffer后在转为base64编码数据流
		base64_decode(s64, username); //函数实现将base64编码数据流转为.jpg格式图片到本目录下
		/*
		 *nodecr包实现对图片解析得到验证码
		 */
		nodecr.process("name.jpg", function (err2, result) {
			if (err2) {
				console.log("code Analytic failure");
			} else {
				//scmulate login
				var req2 = superagent.post(loginUrl).type('form'); //表单提交实现伪登录
				req2.set('Cookie', Cookies);
				var params = {
					'WebUserNO': username.toString(),
					'Password': password.toString(),
					'Agnomen': result.substring(0, 4),
					'submit.x': '0',
					'submit.y': '0'
				};
				req2.send(params).parse(tools.encodingparser).end(function (err3, res3) {
					if (err3) {
						console.log("School network connection failure");
					}
					if (res3.text.indexOf('Logout') != -1) {
						console.log("School network login sucess");
						var $ = cheerio.load(res3.text);
						var name = $('td[align=left]').text();
						console.log("用户名:" + name);
					} else {
						console.log("School network login failure");
					}
				});
			}
		});

	});

});
// function to create file from base64 encoded string

function base64_decode(base64str, file) {
	// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
	var bitmap = new Buffer(base64str, 'base64');
	// write buffer to file
	fs.writeFile("name.jpg", bitmap, function (err) {
		if (err) {
			//res.send(err);
			console.log("保存失败！");
		} else {
			//res.send("保存成功！");
			console.log("保存成功！");
		}
	});
}