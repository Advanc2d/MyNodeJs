//require() 메소드는 exports 객체를 반환함
var member1 = require('./member1');
var member2 = require('./member2');
var member3 = require('./member3');
var member4 = require('./member4');
var printMember = require('./member5').printMember;
var member6 = require('./member6');
var Member7 = require('./member7');
var member7 = new Member7('conan', '코난');

function showMember(){
    return member1.getMember().userName + ',' + member1.group.userName;
}
// function showMember2(){
//     return member2.getMember().userName + ',' + member1.group.userName;
// }
function showMember3(){
    return member3.getMember().userName + ',' + member1.group.userName;
}
function showMember4(){
    return member4().userName + ', No group';
}
console.log('사용자 정보 : %s', showMember());
// console.log('사용자 정보 : %s', showMember2());
console.log('사용자 정보 : %s', showMember3());
console.log('사용자 정보 : %s', showMember4());
printMember();
member6.printMember();
member7.printMember();