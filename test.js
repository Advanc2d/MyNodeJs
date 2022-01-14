// console.log('숫자보여주기 : %d', 10);
// console.log('문자보여주기 : %s', '안녕.');
// console.log('JSON 객체 보여주기 : %j', {name:'코난', age:'29'});

// var result =0;
// console.time('elapsed Time');
// for(var i=1;i<=100;i++){
//     result += i;
// }

// console.timeEnd('elapsed Time');
// console.log("1부터 100까지 합 : %d", result);

// console.log("현재 실행한 파일의 이름 : %s", __filename );
// console.log("현재 실행한 파일의 경로 : %s", __dirname );
// var Person = {name:'코난', age:'29'};
// console.dir(Person);

// console.log(dog);
// var dog="bark";
// console.log(dog);
// var dog="happy";
// console.log(dog);

// let dog;
// dog="happy";
// console.log(dog);

// function outer(){
//     var a='AA';
//     var b='BB';
//     function inner(){
//         var a='aa';
//         console.log("from inner : " + a);
//     }
//     return inner;
// }

// var outerFunc = outer();
// outerFunc();

// const car = {
//     name:'beetle',
//     speed:199,
//     color:'yellow',
//     start:function(){
//         return this.speed-10;
//     }
// }

// console.dir(car);

// function add(a,b){
//     return a+b;

// }
// console.log(add(1,4));

// // const lamda_add=(a,b)=>{
// //     return a+b;
// // }
// const lamda_add=(a,b)=>a+b;
// console.log("lamda" + lamda_add(1,4));


// console.log("lamda" + lamda_add(2,4));

// //일반 함수
// const myFunc = function(){
//     console.log(arguments);
// }

// myFunc(1,2,3,4);

// //람다식 함수
// const lamda_myFunc = (...args)=>{
//     console.log(args);
// }

// lamda_myFunc(1,2,3,4);

// function person(){};
// console.log(person.prototype);

// person.prototype.name='conan';
// console.log(person.prototype);

// setTimeout(() =>{
//     console.log("todo : first!")
// },3000);

// setTimeout(() =>{
//     console.log("todo : second!")
// },2000);

// setTimeout(() =>{
//     setTimeout(() =>{
//         console.log("todo : second!")
//     },2000);
//     console.log("todo : first!")
// },3000);

// function mySetTimeout(callback){
//     callback();
// }

// console.log(9);
// setTimeout(function(){
//     console.log("hello");
// },0);

// console.log(1);

// function work(sec, callback){
//     setTimeout(()=>{
//         callback(new Date().toISOString());
//     },sec*1000);
// };
// work(1,(result)=>{
//     work(1,(result)=>{
//         work(1,(result)=>{
//             console.log('third', result);
//         });
//         console.log('second', result);
//     });
//     console.log('first', result);
// });

// function workP(sec, callback){
//     //Promise 인스턴스를 반환하고, then에서는 성공시 콜백 함수 호출
//     return new Promise((resolve, reject)=>{
//         //Promise 생성시 넘기는 callback
//         //resolve : 동작 완료시 호출, reject : 오류 발생시
//         setTimeout(()=>{
//             resolve(new Date().toISOString());
//         },sec*1000);
//     });   
// }

// workP(1).then((result)=>{
//     console.log('first',result);
//     return workP(1);
// }).then((result)=>{
//     console.log('second',result);
// });

// const flag = false;
// const promise = new Promise((resolve, reject)=>{
//     if(flag === true){
//         resolve('orange');
//     }else{
//         reject('apple');
//     }
// });

// promise.then((value)=>{
//     console.log(value);
// });

// promise.catch((value)=>{
//     console.log(value);
// });

// const flag = true;
// const promise = new Promise((resolve, reject)=>{
//     if(flag === true){
//         resolve('orange');
//     }else{
//         reject('apple');
//     }
// }).then((value)=>{
//     console.log(value);
// }).catch((value)=>{
//     console.log(value);
// });

console.log('argv 속성의 패러미터 수 : ' + process.argv.length);
console.dir(process.argv);
process.argv.forEach(function(item,index){
    console.log(index + " : " + item)
});