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
    database = mongoose.connection;
    
    database.on('error',console.error.bind(console, 'mongoose connection error.'));

    database.on('open', function(){
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
        //스키마 정의
        MemberSchema = mongoose.Schema({
            userId : {type:String, require:true, unique:true},
            userPwd : {type:String, require:true},
            userName : {type:String, index:'hashed'},
            userAge:{type:Number,'default':-1},
            regDate:{type:Date, index:{unique:false}, 'default':Date.now},
            updateDate:{type:Date, index:{unique:false}, 'default':Date.now}
        });

        MemberSchema.static('findById',function(userId, callback){
            return this.find({userId:userId},callback);
        });

        MemberSchema.static('findAll',function(callback){
            return this.find({},callback);
        });

        console.log("MemberSchema 정의");
        //MemberModel 모델 정의

        MemberModel = mongoose.model("members2",MemberSchema);
        console.log('MemberModel 정의함');
    });
    //연결 끊어졌을 때 5초 후 재연결
    database.on('disconnected', function(){
        console.log('연결이 끊어졌습니다. 5초 후 재 연결합니다.');
        setInterval(ConnectDB,5000);
    }) 
}



//라우팅 함수 등록
var router = express.Router();


router.route('/process/login').post(function (req, res) {
    var auth = require('./member').authMember
    auth(database, req, res , authMember)
})

//로그인 라우팅 함수 - 데이터베이스의 정보와 비교
// router.route('/process/login').post(function(req,res){
//     console.log('/process/login 호출');
    
//     var userId = req.body.userId || req.query.userId;
//     var userPwd = req.body.userPwd || req.query.userPwd;
//     console.log("요청 파라미터 : " + userId + ', ' + userPwd);
//     //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

//     if(database){
//         authMember(database,userId, userPwd, function(err, docs){
//             if(err) {throw err;}
//             //조회된 결과가 있으면 성공 응답 전송
//             if(docs){
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>로그인 성공</h1>');
//                 res.end();
//             }else{
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>로그인 실패</h1>');
//                 res.end();
//             }
//         });
//     }else{
//         res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//         res.write('<h1>데이터 베이스 연결 실패</h1>');
//         res.end();
//     }
// });

router.route('/process/addMember').post(function(req,res){
    console.log("들어왔다 add");
    var add = require('./member').addMember;
    add(database, req, res, addMember);
});

// router.route('/process/addMember').post(function(req,res){
//     console.log('/process/addMember 호출');
    
//     var userId = req.body.userId || req.query.userId;
//     var userPwd = req.body.userPwd || req.query.userPwd;
//     console.log("요청 파라미터 : " + userId + ', ' + userPwd);
//     //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

//     if(database){
//         addMember(database,userId, userPwd, function(err, result){
//             if(err) {throw err;}
//             //조회된 결과가 있으면 성공 응답 전송
//             if(result){
//                 console.dir(result);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>가입 성공</h1>');
//                 res.end();
//             }else{
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>가입 실패</h1>');
//                 res.end();
//             }
//         });
//     }else{
//         res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//         res.write('<h1>데이터 베이스 연결 실패</h1>');
//         res.end();
//     }
// });

router.route('/process/updateMember').post(function(req,res){
    console.log("들어왔다 update");
    var update = require('./member').updateMember;
    update(database, req, res, updateMember);
});

// router.route('/process/updateMember').post(function(req,res){
//     console.log('/process/updateMember 호출');
    
//     var userId = req.body.userId || req.query.userId;
//     var userPwd = req.body.userPwd || req.query.userPwd;
//     console.log("요청 파라미터 : " + userId + ', ' + userPwd);
//     //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증

//     if(database){
//         updateMember(database,userId, userPwd, function(err, result){
//             if(err) {throw err;}
//             //조회된 결과가 있으면 성공 응답 전송
//             if(result && result.modifiedCount>0){
//                 console.dir(result);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>사용자 수정 성공</h1>');
//                 res.end();
//             }else{
//                 console.dir(result);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>사용자 수정 실패</h1>');
//                 res.end();
//             }
//         });
//     }else{
//         res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//         res.write('<h1>데이터 베이스 연결 실패</h1>');
//         res.end();
//     }
// });

router.route('/process/listMember').post(function(req,res){
    var list = require('./member').listMember;
    list(database,MemberModel,res);
});

// router.route('/process/listMember').post(function(req,res){
//     console.log('/process/listMember 호출');
//     if(database){
//         //1. 모든 사용자 검색
//         listMember(database, MemberModel, function(err,results){
//             if(err){
//                 console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>');
//                 res.write('<p>'+ err.stack +'</p>');
//                 res.end();
//                 return;
//             }
//             if(results){
//                 //결과 객체 있으면 리스트 전송
//                 // console.dir(results);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h2>사용자 리스트</h2>');
//                 res.write('<div><ul>');
//                 for(var i=0;i<results.length;i++){
//                     var curUserId = results[i]._doc.userId;
//                     var curUserName = results[i]._doc.userName;
//                     res.write('<li>#'+i+':' + curUserId +', ' + curUserName + '</li>');
//                 }
//                 res.write('</ul></div>');
//                 res.end();

//             }else{
//                 // 결과 객체가 없으면 실패 응답 전송
//                 console.dir(results);
//                 res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h1>리스트 출력 실패</h1>');
//                 res.end();
//             }
//         });
//     }
// });


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


var listMember = function(database, callback){
    console.log("listMember 호출됨");
    MemberModel.findAll(function(err, results){
        if(err){
            callback(err, null);
            return;
        }
        console.log('전체출력한 결과');
        if(results.length>0){
            console.log('사용자를 모두 찾음.');
            callback(null, results);
            
        }else{
            console.log("사용자 전체를 찾지 못함");
            callback(null, null);
        }
    });
}

var authMember = function(database, userId, userPwd, callback){
    console.log("authMember 호출됨" + userId + ", " + userPwd);

    MemberModel.findById(userId, function(err, results){
        if(err){
            callback(err, null);
            return;
        }
        console.log('아이디[%s]로 사용자 검색결과',userId);
        if(results.length>0){
            console.log('아이디와 일치하는 사용자 찾음.');
            // 2. 비밀번호 확인
            if(results[0]._doc.userPwd === userPwd){
                console.log('비밀번호 일치함');
                callback(null, results);
            }else{
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
        }else{
            console.log("아이디와 일치하는 사용자를 찾지 못함");
            callback(null, null);
        }
    });
}

var addMember = function(database, userId, userPwd, userName, userAge, callback){
    console.log("addMember 호출됨" + userId + ", " + userPwd+", " + userName +', ' +userAge);

        var user = new MemberModel({"userId":userId, "userPwd":userPwd, "userName":userName, "userAge":userAge});
        console.log(user);
        //save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
        user.save(function(err,addedUser){
            console.log("addedUser%j",addedUser);
            if(err){
                callback(err,null);
                return;
            }
            console.log("사용자 데이터 추가함");
            callback(null, addedUser);
       
    });
}

var updateMember = function(database, userId, userPwd, callback){
    console.log("updateMember 호출됨");
    var members = database.collection("Members");
    members.updateMany({"userId":userId},{$set: {"userPwd":userPwd}},function(err,result){
        if(err){
            // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
            callback(err, null);
            return;
        }
        if(result.modifiedCount>0){
            // update된 항목이 있으면 0보다 크므로 성공
            console.log("사용자 레코드 변경됨 : " + result.modifiedCount);
        }else{
            //update된 항목이 없을 경우
            console.log("변경 못함"); 
        }
        callback(null, result);
    });
}
