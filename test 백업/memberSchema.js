var mongoose = require('mongoose');

var Schema = {};
Schema.createSchema = function(mongoose){
    //스키마 정의
    MemberSchema = mongoose.Schema({
        userId : {type:String, require:true, unique:true},
        userPwd : {type:String, require:true},
        userName : {type:String, index:'hashed'},
        userAge:{type:Number,'default':-1},
        regDate:{type:Date, index:{unique:false}, 'default':Date.now},
        updateDate:{type:Date, index:{unique:false}, 'default':Date.now}
    });
    // 스키마에 static 메소드 추가
    MemberSchema.static('findById',function(userId, callback){
        return this.find({userId:userId},callback);
    });

    MemberSchema.static('findAll',function(callback){
        return this.find({},callback);
    });
    MemberSchema.static('updateMem',function(userId, userPwd, userName, userAge, callback){
        return this.update({userId:userId},{$set:{userPwd:userPwd,userName:userName,userAge:userAge}},callback);
    });
    console.log("MemberSchema 정의");
        
    //MemberModel 모델 정의
    // MemberModel = mongoose.model("members2",MemberSchema);
    
    return MemberSchema;
};
module.exports = Schema;