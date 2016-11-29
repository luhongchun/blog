准备工作：

​1.安装superagent（一个的请求代理模块api，可处理get,post,put,delete,head请求​）

npm install ​superagent

2.安装cheerio（装载已爬取的html网页，类似jQuery，方便获取网页指定数据。）​

npm install ​cheerio

3.​安装nodecr（解析验证码​）
npm install ​nodecr
4.更改相应参数
 loginUrl = '*****'; //登录网址
 validateImgUrl = '******'; //验证码网址
 username = * * * * * ;
 password = * * * * * ;
 params={*,*,*,*};
5.后台运行
node login.js

