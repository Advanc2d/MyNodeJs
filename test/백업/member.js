

exports.listMember = function(database, Membermodel, callback){
    console.log("listMember_module 호출");
    // console.dir(database);
    Membermodel.findAll(function(err, results){
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

exports.authMember = function(database, MemberModel,  userId, userPwd, callback){
    console.log("authMember 호출됨" + userId + ", " + userPwd);
    // console.dir(database);
    //Members 컬렉션 참조
    // var members = database.collection("Members");
    // members.find({"userId":userId,"userPwd":userPwd}).toArray(function(err,docs){
    //     if(err){
    //         // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
    //         callback(err, null);
    //         return;
    //     }
    //     if(docs.length>0){
    //         // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
    //         console.log("아이디[%s], 패스워드[%s]가 일치하는 사용자 찾음", userId, userPwd);
    //         callback(null, docs);
    //     }else{
    //         //조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
    //         console.log("일치하는 사용자를 찾지 못함");
    //         callback(null, null);
    //     }
    // });
    



    // MemberModel.find({"userId":userId, "userPwd":userPwd}, function(err, results) {
    //     if(err){
    //         callback(err, null);
    //         return;
    //     }

    //     console.log('아이디[%s], 비밀번호[%s]로 사용자 검색결과',userId, userPwd);
    //     console.dir(results);
    //     if(results.length>0){
    //         console.log('일치하는 사용자 찾음.',userId, userPwd);
    //         callback(null, results);
    //     }else{
    //         console.log("일치하는 사용자를 찾지 못함");
    //         callback(null, null);
    //     }
    // });

    // 1. 아이디를 사용해 검색
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

exports.addMember = function(database, user, userId, userPwd, userName, userAge, callback){
    // //Members 컬렉션 참조
    // var members = database.collection("Members");
    // members.insertMany([{"userId":userId,"userPwd":userPwd}], function(err,result){
    //     if(err){
    //         // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
    //         callback(err, null);
    //         return;
    //     }
    //     if(result.insertedCount>0){
    //         // insert 된 항목이 있으면 0보다 크므로 성공
    //         console.log("사용자 레코드 추가됨 : " + result.insertedCount);
    //     }else{
    //         //insert된 항목이 없을 경우
    //         console.log("추가 못함"); 
    //     }
    //     callback(null, result);

        console.log("addMember 호출됨" + userId + ", " + userPwd+", " + userName +', ' +userAge);
        
        // var user = new MemberModel({"userId":userId, "userPwd":userPwd, "userName":userName, "userAge":userAge});
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