const a=require("express");
const app=a();
const bd=a.urlencoded({extended:true});
const m=require("mongodb").MongoClient;
app.use(a.static(__dirname));
app.use(a.json());

/*db connection*/
global.con;
global.date=new Date();
function dbs(){
    var url="mongodb://127.0.0.1:27017";
    return new Promise((resolve,reject)=>{
        m.connect(url,(err,db)=>{
        if (err)throw err;
        dbo=db.db('Chat');
       resolve(dbo);  
        })});
    
};


app.get('/',(req,res)=>{
    res.sendFile("chat.html",{root:__dirname});
});
app.post('/send',bd,(req,res)=>{
    send(req.body);

    res.send("success");
});
app.post('/receive',bd,(req,res)=>{
    // res.send(recieve(req.body.num));
    recieve(req.body.num).then((e)=>{res.send(e)});
    // console.log(recieve(req.body.num));
});
app.listen(8080);

function send(self){
    var from="n181022@rguktn";
    var send=self.to;
    var time=date.getFullYear()+""+date.getMonth()+""+date.getDate()+1+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
    var msg={};
    msg[send]={msg:{time:time,status:200,msg:self.text}};
    con.collection("chat").updateOne({id:from},{$push:msg},(err,res)=>{
        if(err)throw err;
        console.log(res);
    });
    con.collection("chat").updateOne({id:send},{$push:{status:from}},(err,res)=>{
        console.log(res);
    });
};
dbs().then((i)=>{con=i;});

function recieve(){
    var from='n181022@rguktn';
        con.collection("chat").findOne({id:from},{projection:{status:1,_id:0}},(err,data)=>{
            if (err) throw err;
            console.log(data.status.length);
            if(data.status.length==0){
                console.log("hello");

                setTimeout(recieve,500);
            }
            else{
                d=[];
                data.status.forEach((i)=>{
                    console.log(i);
                    let p=new Promise((resolve,reject)=>{
                        con.collection('chat').find({id:i})
                    })
                })
            }
        })


   
    // con.collection('chat').find({id:from},{status:1,_id:0},(err,res)=>{
    //     console.log(res.status);
    // })
    // console.log(i);
    // if (i%2==0){
    //    return "sucesful re";
    // }
    // else{
    //     return new Promise((resolve,reject)=>{setTimeout(()=>{resolve(recieve(++i))},500)});
    //     // return new Promise((resolve, reject) => {
    //     //     setTimeout(() => {
    //     //       resolve('done!');
    //     //     });
    //     //   });
    // }
};