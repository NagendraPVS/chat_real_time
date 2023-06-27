const e=require("express");
const app=e()
const b=require("body-parser");
var sendOtp=require('./otp.js');

/*middle ware*/
app.use(e.static(__dirname));
app.use(b.urlencoded({extended:true,}));


/*global variable*/
var otp;
app.get('/',(req,res)=>{
    res.sendFile('login.html',{root:__dirname});
})
app.get(/sendotp\/.?/,(req,res)=>{
   
   otp=sendOtp((req.url).slice(9));
   console.log(otp);
   if (otp){
    res.send("otp successfully sent");
   }
   else{
    res.send("unsucessfull sent");
   }


});
app.post('/validate',(req,res)=>{
    if (otp==req.body.otp){
        res.send("successfully logged in");

    }
    else{
        res.redirect('/');
    }
})
app.listen(8080);
