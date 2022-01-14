var express=require('express'), http=require('http'),path=require('path');
var bodyParser = require('body-parser'), static=require('serve-static');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var multer = require('multer');
var fs= require('fs');
//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors= require('cors');
const { file } = require('nconf');


var app = express();
//기본 속성 설정
app.set('port',process.env.PORT || 3000);
// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}))
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())
//public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname,'public')));
app.use('/uploads', static(path.join(__dirname,'uploads')));
app.use(cors());
//세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));
// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser-> multer->router
var storage = multer.diskStorage({
    destination:function(req, file,callback){
        callback(null, 'uploads')
    },
    filename:function(req, file, callback){
        callback(null, file.originalname + Date.now())
    }
});

var upload = multer({
    storage:storage,
    limits:{
        files:10, fileSize: 1024*1024*1024
    }
});

var router = express.Router();

var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});


router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출');
    // var paramName = req.params.name;
    var paramUserId = req.body.userId || req.query.userId;
    var paramUserPwd = req.body.userPwd || req.query.userPwd;
    if(req.session.user){
        console.log("이미 로그인되어 상품 페이지로 이동합니다.");
        res.redirect('/public/product.html');
    }else{
        req.session.user = {id:paramUserId, name:'코난', authorized:true};
        // console.log(req.session.user.name + "세션 저장");
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        
        // res.write('<div><p>Param name : ' + paramName + '</p></div>');
        res.write('<div><p>Param id : ' + paramUserId + '</p></div>');
        res.write('<div><p>Param password : ' + paramUserPwd + '</p></div>');
        res.write("<br><br><div><p><a href='/process/product'>상품 페이지로 돌아가기</a></p></div>");
        res.end();
    }
    
});

//로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req,res){
    console.log('/process/logout 호출');
    // console.log(req.session.user.name + "세션 누구?");
    if(req.session.user){
        // 로그인 상태
        console.log("로그아웃합니다.");
        req.session.destroy(function(err){
            if(err){ throw err;}
            console.log("세션을 삭제하고 로그아웃 함");
            res.redirect('/public/login2.html');
        });
    }else{
        //로그인 안된 상태
        console.log("로그인 되어있지 않았다.");
        res.redirect('/public/login2.html');
    }
});

//상품정보 라우팅 함수
router.route('/process/product').get(function(req,res){
    console.log('/process/product 호출');
    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
});

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();
// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
// router.route('/process/upload').post(upload.array('uploadedFile',1),function(req, res){
router.route('/process/upload').post(upload.array('uploadedFile', 1), function(req, res){
    console.log('/process/upload 호출됨');
    try{
        var files = req.files;
        console.dir('#--- 업로드된 첫번째 파일 정보 ===#');
        console.dir(req.files[0]);
        console.dir('#--------#');
        //현재의 파일 정보를 저장할 변수 선언
        var originalname = '', filename='', mimetype='', size=0;
        if(Array.isArray(files)){
            // 배열에 들어가 있는 경우(설정에서 1개의 파일도 배열에 넣게 했음)
            console.log("배열에 들어 있는 파일 갯수 %d" , files.length);
            for(var index =0;index<files.length;index++){
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size=files[index].size;
            }

        }else{
            // 배열에 들어가 있지 않은 경우(현재 설정에서는 해당 없음)
            console.log("파일 갯수 : 1");
            originalname = files[index].originalname;
            filename = files[index].filename;
            mimetype = files[index].mimetype;
            size=files[index].size;

        }
        
        console.log("현재 파일 정보 : "  + originalname + ', ' + filename +', '
        + mimetype + ', ' + size);
        //클라이언트에 응답 전송
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>파일 업로드 성공</h1>');
        res.write('<hr/>');
        res.wirte('<p> 원본 파일명 : ' + originalname + '-> 저장 파일명 : ' + filename + '</p>');
        res.wirte('<p> MIME TYPE : ' + mimetype + '</p>');
        res.wirte('<p> 파일 크기 : ' + size + '</p>');
        res.end();
    }catch(err){
        console.dir(err.stack);
    }
});
app.use("/",router);           // 라우터 객체를 app객체에 등록
// 등록되지 않은 패스에 대해 페이지 오류 응담
// app.all('*', function(req,res){
//     res.status(404).send('<h1>ERROR-페이지를 찾을 수 없습니다.</h1>');
// });
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);    
app.listen(3000,function(){
        console.log('Express 서버가 3000번 포트에서 start');
    });