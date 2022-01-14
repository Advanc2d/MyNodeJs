// const calc = require('./calc.js');
// console.log("몯률로 분리한 후 - calc.add 함수 호출 결과 : %d", calc.add(20,20));

// var calc2=require('./calc2.js');
// console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.add(10,20));

// const nconf=require('nconf');
// nconf.env();
// console.log('OS 환경변수의 값 : %s', nconf.get('OS'));

// const os = require('os');

// // OS 정보 보기
// console.log('시스템의 hostname : %s', os.hostname());
// console.log('시스템의 메모리 : %d, / %d', os.freemem(),os.totalmem);
// console.log('시스템의 CPU 정보\n');
// console.dir(os.cpus());
// console.log('시스템의 네트워크 인터페이스 정보\n');
// console.dir(os.networkInterfaces());

// var path = require('path');     

// //디렉터리 이름 합치기
// var directoires = ['users', 'mike','docs'];
// var doscDirectory = directoires.join(path.sep);
// console.log("문서 디렉터리 : %s", doscDirectory);

// // 디렉터리 이름과 파일 이름 합치기
// var curPath = path.join('/Users/mike','notepad.exe');
// console.log('파일 패스 : %s',curPath);

// // 패스에서 디렉터리, 파일 이름, 확장자 구별하기
// var filename = "C:\\Users\\mike\\notepad.exe";
// var dirname = path.dirname(filename);
// var basename = path.basename(filename);
// var extname = path.extname(filename);

// console.log('디렉터리 : %s\n 파일 이름 : %s\n 확장자 : %s\n',dirname, basename, extname);

// var url = require('url');

// var curURL = url.parse("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=자바스크립트");

// var curStr = url.format(curURL);
// console.log("주소 문자열 : %s", curStr);
// console.dir(curURL);

// var querystring = require('querystring');
// var param = querystring.parse(curURL.query);
// console.log("요청 query 중 파라미터의 값 : %s", param.query);
// console.log("원본 요청 파라미터 : %s", querystring.stringify(param));

// process.on('tick', function(count){
//     console.log('tick 이벤트 발생활 : %s', count);
// });

// setTimeout(function(){
//     console.log('2초 후에 tick 이벤트 전달 시도함');
//     process.emit('tick','2');
// }, 2000);

// var Calc = require('./calc3');
// var calc = new Calc();
// calc.emit('stop');
// console.log(Calc.title + '에 stop 이벤트 전달함');

var fs=require('fs');
// fs.readFile('../package.json','utf8',function(err, data){
//     console.log(data);
// });

// console.log("프로젝트 폴더 안의 package.json 파일 읽기");

// fs.writeFile('/html_workspace/output.txt', 'Hello World!', function(err){
//     if(err){
//         console.log('Error : ' + err);
//     }
//     console.log('output.txt 파일에 데이터 쓰기 완료');
// })

// fs.open('/html_workspace/output.txt','w',function(err, fd){
//     if(err){
//         throw err;
//     }
//     const buf = Buffer.from('안녕!\n','utf-8');
//     fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){
//         if(err){
//             throw err;
//         }
//         console.log(err, written, buffer);
//         fs.close(fd, function(){
//             console.log("파일 열고 데이터 쓰고 파일 닫기 완료");
//         });
//     });
// });

// fs.open('/html_workspace/output.txt','r',function(err, fd){
//     if(err){
//         throw err;
//     }
//     var buf = Buffer.alloc(20);
//     console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
//     fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer){
//         if(err){
//             throw err;
//         }
//         var inStr = buffer.toString('utf8',0,bytesRead);
//         console.log('파일에서 읽은 데이터 : %s', inStr);
//         console.log(err, bytesRead, buffer);
//         fs.close(fd, function(){
//             console.log("output.txt 파일을 열고 읽기 완료");
//         });
//     });
// });

// var infile = fs.createReadStream('/html_workspace/output.txt',{flags:'r'});
// var outfile = fs.createWriteStream('/html_workspace/output2.txt',{flags:'w'});
// infile.on('data',function(data){
//     console.log('읽어 들인 데이터',data);
//     outfile.write(data);
// });
// infile.on('end',function(){
//     console.log('파일 읽기 종료');
//     outfile.end(function(){
//         console.log('파일 쓰기 종료');
//     });
// });

// fs.mkdir('/html_workspace/docs2',0666,function(err){
//     if(err) throw err;
//     console.log("새로운 docs 폴더를 생성");
// });

// fs.rmdir('/html_workspace/docs2', function(err){
//     if(err) throw err;
//     console.log("docs 폴더를 삭제");
// });


// var http = require('http');
// var server = http.createServer();
// var port =3000;
// server.listen(port, function(){
//     console.log("웹 서버 시작 : %d", port);
// });

// var host = '192.168.0.31';
// server.listen(port, host,'50000',function(){
//     console.log('웹 서버 시작 : %s, %d', host, port);
// });

// server.on('connection', function(socket){
//     var addr = socket.address();
//     console.log('클라이언트가 접속. %s, %d', addr.address, addr.port);
// });

// server.on('request', function(req,res){
//     console.log('클라이언트가 요청함');
//     console.dir(req);
// });

// server.on("request",function(req, res){
//     console.log("클라이언트 요청");
//     res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
//     res.write("<!DOCTYPE html>");
//     res.write("<html>");
//     res.write("<head>");
//     res.write("<title>응답 페이지</title>");
//     res.write("</head>");
//     res.write("<body>");
//     res.write("<h1>노드제이에수로부터의 응답 페이지</h1>");
//     res.write("</body>");
//     res.write("</html>");
//     res.end();
// });

// server.on("request",function(req, res){
//     console.log("클라이언트 요청");
//     var filename = 'conan.jpg';
//     fs.readFile(filename, function(err, data){
//         res.writeHead(200,{"Content-Type":"image/jpg"});
//         res.write(data);
//         res.end();
//     })
// });

// server.on("request",function(req, res){
//     console.log("클라이언트의 사진요청");
//     var filename = 'conan.jpg';
//     var infile = fs.createReadStream(filename,{flags:'r'});
//     infile.pipe(res);
// });




// const http = require('http');
// const options={
//     host:'www.google.com',
//     port:80,
//     path:'/'
// };

// const req=http.get(options,function(res){
//     let resData = '';
//     res.on('data',function(chunk){
//         resData+=chunk;
//     });
//     res.on('end',function(){
//         console.log(resData);
//     }); 
// });
// req.on('error',function(err){
//     console.log("오류 발생" + err.message);
// });



// let http = require('http');

// let opts = {
//     host:'www.google.com',
//     port:80,
//     method:'POST',
//     path:'/',
//     headers:{}
// };

// let resData ='';
// let req = http.request(opts, function(res){
//     //응답 처리
//     res.on('data',function(chunk){
//         resData += chunk;
//     });
//     res.on('end',function(){
//         console.log(resData);
//     });
// });

// opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// req.data = "q=actor";
// opts.headers['Content-Length'] = req.data.length;

// req.on('error',function(err){
//     console.log("에러 발생 : " + err.message);
// });
// //요청 전송
// req.write(req.data);
// req.end();



// const express = require('express');
// //익스프레스 객체 생성
// const app = express();
// // 기본 포트를 app 객체에 속성으로 설정
// app.set('port', process.env.PORT || 3000);
// //Express 서버 시작

// app.get('/',(req,res)=>{
//     res.send('<h3>Hello Wolrd</h3>');
// });

// app.listen(app.get('port'),()=>
// console.log("익스프레스 서버를 시작했습니다. : " + app.get('port')));






// let express = require('express'), http = require('http');
// let app = express();



// app.use(function(req, res, next){
//     console.log('첫 번째 미들웨어에서 요청을 처리함.');
//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.end('<h1>Express 서버 응답</h1>');
// });

// app.use(function(req, res, next){
//          console.log('첫 번째 미들웨어에서 요청을 처리함.');
//          res.send({name:'코난', age:10});
// });

// app.use(function(req, res, next){
//          console.log('첫 번째 미들웨어에서 요청을 처리함.');
//          res.redirect('http://google.co.kr');
// });





// app.use(function(req, res, next){
//     console.log('첫 번째 미들웨어에서 요청을 처리함.');
//     req.user = 'conan';
//     next();
// });

// app.use('/', function(req, res, next){
//     console.log('두 번째 미들웨어에서 요청을 처리함.');
//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.end('<h1>Express 서버에서 ' + req.user + '가 응답중</h1>');
// });



// app.use(function(req, res, next){
//     console.log('첫 번째 미들웨어에서 요청 처리중');
//     var userAgent = req.header('User-Agent');
//     var paramName = req.query.name;
//     res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//     res.write('<h1>Express 서버에서 응답한 결과</h1>');
//     res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
//     res.write('<div><p>Param-Name : ' + paramName + '</p></div>');
//     res.end();
// });
// app.listen(3000,function(){
//     console.log('Express 서버가 3000번 포트에서 start');
// });






// var express=require('express'), http=require('http'),path=require('path');
// var bodyParser = require('body-parser'), static=require('serve-static');
// var app = express();
// app.set('port',process.env.PORT || 3000);
// // body-parser를 이용해 application/x-www-form-urlencoded 파싱
// app.use(bodyParser.urlencoded({extended:false}))
// // body-parser를 이용해 application/json 파싱
// app.use(bodyParser.json())
// app.use(static(path.join(__dirname,'public')));
// app.use(function(req,res,next){
//     console.log('첫번째 미들웨어');
//     var paramUserId = req.body.userId || req.query.userId;
//     var paramUserPwd = req.body.userPwd || req.query.userPwd;
//     res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//     res.write('<h1>Express 서버에서 응답한 결과</h1>');
//     res.write('<div><p>Param id : ' + paramUserId + '</p></div>');
//     res.write('<div><p>Param password : ' + paramUserPwd + '</p></div>');
// })
// app.listen(3000,function(){
//         console.log('Express 서버가 3000번 포트에서 start');
//     });






// login.html과 연동하기
var express=require('express'), http=require('http'),path=require('path');
var bodyParser = require('body-parser'), static=require('serve-static');
var app = express();
app.set('port',process.env.PORT || 3000);
// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}))
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname,'public')));

var router = express.Router();
router.route('/process/login/:name').post(function(req,res){
    console.log('/process/login 처리함');
    var paramName = req.params.name;
    var paramUserId = req.body.userId || req.query.userId;
    var paramUserPwd = req.body.userPwd || req.query.userPwd;
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramUserId + '</p></div>');
    res.write('<div><p>Param password : ' + paramUserPwd + '</p></div>');
    res.write("<br><br><div><p><a href='/public/login.html'>로그인 페이지로 돌아가기</a></p></div>");
})

router.route('/process/users/:id').get(function(req,res){
    console.log('/process/users/:id 처리함');
    var paramId = req.params.id;
    console.log('/process/users와 토큰 %s를 이용해 처리함', paramId);
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
})
var cookieParser = require('cookie-parser');
app.use(cookieParser());
router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 처리');
    // z쿠키 설정.... 응답 객체 cookie메소드 호출
    res.cookie('user',{
        id:'conan',
        name:'코난',
        authorized:true
    });
    //redirect로 응답
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출');
    
    res.send(req.cookies);
});

app.use("/",router);           // 라우터 객체를 app객체에 등록
// 등록되지 않은 패스에 대해 페이지 오류 응담
app.all('*', function(req,res){
    res.status(404).send('<h1>ERROR-페이지를 찾을 수 없습니다.</h1>');
});
    
app.listen(3000,function(){
        console.log('Express 서버가 3000번 포트에서 start');
    });



