// Express 기본 모듈 불러오기
let express = require('express'),http = require('http'), path = require('path');

// Express의 미들웨어 불러오기
let bodyParser = require('body-parser'), 
                cookieParser = require('cookie-parser'), 
                static = require('serve-static'), 
                errorHandler=require('errorhandler');

// 오류 핸들러 모듈 사용
let expressErrorHandler = require('express-error-handler');
errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});
//Session 미들 웨어 부르기
let expressSession = require("express-session");

// mongoose 설정
var mongoose =require('mongoose');
var member = require('./member');


// 익스프레스 객체 생성
let app = express();

//기본 속성 설정
app.set('port',process.env.PORT || 3000);
// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}))
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())
//public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname,'public')));

//몽고디비 모듈 사용
let MongoClient = require('mongodb').MongoClient;


//데이터 베이스 객체를 위한 변수 선언
let database;
let MemberSchema;
let MemberModel;


//데이터베이스에 연결
function connectDB(){
    //데이터베이스 연결 정보
    // let databaseUrl = 'mongodb://localhost:27017/';

    // 몽고디비 데이터베이스 연결 정보
    let databaseUrl = 'mongodb://localhost:27017/bitDB';
    
    //데이터베이스 연결
    // MongoClient.connect(databaseUrl, function(err,client){
    //     database = client.db('bitDB');
    //     if(err) throw err;
    //     console.log("데이터베이스에 연결되었습니다." + databaseUrl);
    // });


    // mongoose모듈 이용한 데이터베이스 연결
    console.log("데이터베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    //mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
    mongoose.connect(databaseUrl);
    console.log(mongoose.connection);
    database = mongoose.connection;
    
    database.on('error',console.error.bind(console, 'mongoose connection error.'));

    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
        //스키마 정의
        // MemberSchema = mongoose.Schema({
        //     userId : {type:String, require:true, unique:true},
        //     userPwd : {type:String, require:true},
        //     userName : {type:String, index:'hashed'},
        //     age:{type:Number,'default':-1},
        //     regDate:{type:Date, index:{unique:false}, 'default':Date.now},
        //     updateDate:{type:Date, index:{unique:false}, 'default':Date.now}
        // });

        // MemberSchema.static('findById',function(userId, callback){
        //     return this.find({userId:userId},callback);
        // });

        // MemberSchema.static('findAll',function(callback){
        //     return this.find({},callback);
        // });

        // console.log("MemberSchema 정의");
        // //MemberModel 모델 정의

        // MemberModel = mongoose.model("members2",MemberSchema);
        // console.log('MemberModel 정의함');
    });
    //연결 끊어졌을 때 5초 후 재연결
    database.on('disconnected', function(){
        console.log('연결이 끊어졌습니다. 5초 후 재 연결합니다.');
        setInterval(ConnectDB,5000);
    }) 
}



//라우팅 함수 등록
var router = express.Router();
//로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출');
    
    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    console.log("요청 파라미터 : " + userId + ', ' + userPwd);
    //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

    if(database){
        authMember(database,userId, userPwd, function(err, docs){
            if(err) {throw err;}
            //조회된 결과가 있으면 성공 응답 전송
            if(docs){
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
                res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패</h1>');
                res.end();
            }
        });
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

router.route('/process/addMember').post(function(req,res){
    console.log('/process/addMember 호출');
    
    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    var userName = req.body.userName || req.query.userName;
    console.log("요청 파라미터 : " + userId + ', ' + userPwd+ ', ' + userName);
    //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

    if(database){
        addMember(database,userId, userPwd, userName, function(err, result){
            if(err) {throw err;}
            //조회된 결과가 있으면 성공 응답 전송
            if(result){
                console.dir(result);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>가입 성공</h1>');
                res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>가입 실패</h1>');
                res.end();
            }
        });
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

router.route('/process/updateMember').post(function(req,res){
    console.log('/process/updateMember 호출');
    
    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    console.log("요청 파라미터 : " + userId + ', ' + userPwd);
    //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

    if(database){
        updateMember(database,userId, userPwd, function(err, result){
            if(err) {throw err;}
            //조회된 결과가 있으면 성공 응답 전송
            if(result && result.modifiedCount>0){
                console.dir(result);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 수정 성공</h1>');
                res.end();
            }else{
                console.dir(result);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 수정 실패</h1>');
                res.end();
            }
        });
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

router.route('/process/listMember').post(function(req,res){
    console.log('/process/listMember 호출');
    if(database){
       
            member();
        
    }
});

app.use("/",router);           // 라우터 객체를 app객체에 등록
// 등록되지 않은 패스에 대해 페이지 오류 응담
// app.all('*', function(req,res){
//     res.status(404).send('<h1>ERROR-페이지를 찾을 수 없습니다.</h1>');
// });
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);  


app.listen(app.get('port'),function(){
        console.log("서버가 시작되었습니다. 포트 : " + app.get('port'))   
        //데이터베이스 연결을 위한 함수 호출
        connectDB();
    });



