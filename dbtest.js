const m=require("mongodb").MongoClient;
var url="mongodb://127.0.0.1:27017";
const app=require('express')();
function dbs(){

return new Promise((resolve,reject)=>{
    m.connect(url,(err,db)=>{
    if (err)throw err;
    dbo=db.db('Chat');
   resolve(dbo);
    // dbo.collection('chat').findOne({},(err,res)=>{
    //     if (err)throw err;
    //     console.log(res);
    // })
    // });

    })})

};
global.con;
dbs().then((i)=>{con=i});
app.get('/',(req,res)=>{
    res.sendFile('test.html',{root:__dirname});
})
app.get('/abc',(req,res)=>{
    con.collection('chat').findOne({},(err,result)=>{if (err)throw err;res.send(result);})
})
app.listen(8888);