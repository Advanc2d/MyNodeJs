var listMember = function(database, callback){
    console.log("listMember_module 호출");
    // console.dir(database);
    // console.log(databse.MemberModel);
    database.MemberModel.findAll(function(err, results){
        if(err){
            callback(err, null);
            return;
        }
        console.log('전체 검색 결과');
        if(results.length>0){
            console.log('전체출력');
            callback(null, results);
        }else{
            console.log("전체 출력 불가");
            callback(null, null);
        }
    });
}

var authMember = function(database, userId, userPwd, callback){
    console.log("authMember 호출됨" + userId + ", " + userPwd);

    // 1. 아이디를 사용해 검색
    database.MemberModel.findById(userId, function(err, results){
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

var addMember = function(database,userId, userPwd, userName, userAge, callback){

        console.log("addMember 호출됨" + userId + ", " + userPwd+", " + userName +', ' +userAge);
        
        var user = new database.MemberModel({"userId":userId, "userPwd":userPwd, "userName":userName, "userAge":userAge});
        // console.log(user);
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

 var updateMember = function(database, userId, userPwd, userName, userAge, callback){
    console.log("updateMember 호출됨");
    // var members = database.collection('members2');
    // members.updateMany({"userId":userId},{$set: {"userPwd":userPwd, "userName":userName, "userAge":userAge, "updateDate":Date.now}}, function(err,result){
    database.MemberModel.updateMem(userId, userPwd, userName, userAge, function(err, result){
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
// module.exports = listMember;
// module.exports = addMember;
// module.exports = authMember;

exports.procUpdateMember = function(req, res){
    console.log('/process/update 호출');
    var database =req.app.get('database');

    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    var userName = req.body.userName || req.query.userName;
    var userAge = req.body.userAge || req.query.userAge;

    if(database.db){
        updateMember(database, userId, userPwd, userName, userAge, function(err, results){
            if(err) {throw err;}
            if(results){
                console.dir(results);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>수정 성공</h1>');
                res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>수정 실패</h1>');
                res.end();
            }
        });
    } else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
}



exports.procLogin = function(req, res){
    console.log('/process/login 호출');
    var database = req.app.get('database');

    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    console.log("요청 파라미터 : " + userId + ', ' + userPwd);

    if(database.db){
        authMember(database, userId, userPwd, function(err, docs){
            

            if(err) {throw err;}
            //조회된 결과가 있으면 성공 응답 전송
            if(docs){
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                var context = {userId:userId, userPwd:userPwd};
                req.app.render('loginSuccess', context, function(err, html){
                    if(err){
                        console.error("뷰 랜더링 중 오류 발생: " + err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
                    // console.log('rendered : ' + html);
                    res.end(html);  //결과적으로 랜더링 보내는 부분
                });
                // res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                // res.write('<h1>로그인 성공</h1>');
                // res.write('<p>사용자 아이디 : ' + userId + '</p>');
                // res.write('<p>사용자 비밀번호 : ' + userPwd + '</p>');
                // res.end();
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

 }

exports.procAddMember = function(req, res){
    console.log('/process/addMember 호출');
    var database = req.app.get('database');
    
    var userId = req.body.userId || req.query.userId;
    var userPwd = req.body.userPwd || req.query.userPwd;
    var userName = req.body.userName || req.query.userName;
    var userAge = req.body.userAge || req.query.userAge;
    console.log("요청 파라미터 : " + userId + ', ' + userPwd+ ', ' + userName + ', ' + userAge);
    //데이터 베이스 객체가 초기화된 경우, authMember 함수 호출하여 사용자 인증
    
    // var user = new MemberModel({"userId":userId, "userPwd":userPwd, "userName":userName, "userAge":userAge});
    if(database.db){
        addMember(database, userId, userPwd, userName, userAge, function(err, results){
            if(err) {throw err;}
            //조회된 결과가 있으면 성공 응답 전송
            if(results){
                var context = {results:results};
                req.app.render('addMember',context,function(err,html){
                    if(err){
                        console.error("뷰 랜더링 중 오류 발생: " + err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
                    // console.log('rendered : ' + html);
                
                    res.end(html);  //결과적으로 랜더링 보내는 부분
                });
                // console.dir(results);
                // res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                // res.write('<h1>가입 성공</h1>');
                // res.end();
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
}

exports.procListMember = function(req, res){
    console.log('/process/listMember 호출');
    var database = req.app.get('database');

    if(database.db){
        //1. 모든 사용자 검색
        // member.listMember(database, function(err,results){
            // console.dir(database);
            listMember(database, function(err,results){
            if(err){
                console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>');
                res.write('<p>'+ err.stack +'</p>');
                res.end();
                return;
            }
            if(results){
                var context = {results:results};
                req.app.render('listMember',context,function(err,html){
                    if(err){
                        console.error("뷰 랜더링 중 오류 발생: " + err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
                    // console.log('rendered : ' + html);
                    res.end(html);  //결과적으로 랜더링 보내는 부분
                });
                // //결과 객체 있으면 리스트 전송
                // // console.dir(results);
                // res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                // res.write('<h2>사용자 리스트</h2>');
                // res.write('<div><ul>');
                // for(var i=0;i<results.length;i++){
                //     var curUserId = results[i]._doc.userId;
                //     var curUserName = results[i]._doc.userName;
                //     res.write('<li>#'+i+':' + curUserId +', ' + curUserName + '</li>');
                // }
                // res.write('</ul></div>');
                // res.end();

            }else{
                // 결과 객체가 없으면 실패 응답 전송
                console.dir(results);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>리스트 출력 실패</h1>');
                res.end();
            }
        });
    }
}

// module.exports = procAddMember;
// module.exports = procLogin;
// module.exports = procListMember;