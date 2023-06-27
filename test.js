var fs=require("fs");
global.a=3;
global.date=new Date()
var time=date.getFullYear()+""+date.getMonth()+""+date.getDate()+1+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
console.log(time);
// const readFile = (fileName, encoding) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(fileName, encoding, (err, data) => {
//             if (err) {
//                 return reject(err);
//             }
//             console.log(a);

//             a=data.toString();
//             resolve(a);
//         });
//     });
// }

// readFile('./a.txt')
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     });


//@2nd method 
// async function f() {
//     const fsPromises = require('fs').promises;
//     const data = await fsPromises.readFile('a.txt').catch((err) => console.error('Failed to read file', err));
//     a=data.toString();
//     return data.toString();
//   };
// f().then((d) => console.log(a)).catch((err) => console.error('f() failed', err));

//@3rd method
// const fs = require('fs');
// const util = require('util');

// const readFile = util.promisify(fs.readFile);

// (async () => {
//     try {
//         const content = await readFile('./sample.txt', 'utf-8');
//         console.log(content);
//     } catch (err) {
//         console.error(err);
//     }
// })();


// function myDisplayer(some) {
//     console.log(some);
//   }
  
//   async function myFunction() {
//     let myPromise = new Promise(function(resolve, reject) {
//         fs.readFile("a.txt","utf-8",(err,data)=>{
//             console.log(a);
//             a=data;
//             console.log("insider "+a);
//             resolve(a);
//         });
        
//       });
//       return myPromise;
//   }
  
//   myFunction().then(
//     function(value) {myDisplayer(value);},
//     function(error) {myDisplayer(error);}
//   );

/*
*
*
*
    dbtest promises
*
*
*
*/


//   const m=require("mongodb").MongoClient;
// var url="mongodb://127.0.0.1:27017";
// const app=require('express')();
// function dbs(){

// return new Promise((resolve,reject)=>{
//     m.connect(url,(err,db)=>{
//     if (err)throw err;
//     dbo=db.db('Chat');
//    resolve(dbo);
//     // dbo.collection('chat').findOne({},(err,res)=>{
//     //     if (err)throw err;
//     //     console.log(res);
//     // })
//     // });

//     })})

// };
// global.con;
// dbs().then((i)=>{con=i});
// app.get('/',(req,res)=>{
//     res.sendFile('test.html',{root:__dirname});
// })
// app.get('/abc',(req,res)=>{
//     con.collection('chat').findOne({},(err,result)=>{if (err)throw err;res.send(result);})
// })
// app.listen(8888);