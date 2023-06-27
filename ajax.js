var a=new Date();
var s=0;
var r=0;
receive();
function send(self){
    var msg=document.getElementById("input").value;
    var data={to:self,text:msg};
    var msgId=a.getFullYear()+""+a.getMonth()+""+a.getDay()+""+s++;
    ajax('post' ,'send',tick,data,msgId)
    // decorate(data);

}
function decorate(self){

}
function tick(self){
    console.log(self+"success");

}


function receive(){
    var msgId=a.getFullYear()+""+a.getMonth()+""+a.getDay()+""+r++;
    ajax('post','receive',decorate2,{num:r++},msgId);
}
function decorate2(self){
    console.log(self);

}

function ajax(method,route,fun,data,msgId){
    try{
    x=new XMLHttpRequest();
    x.open(method,route,true);
    x.setRequestHeader("content-type","application/json");
    
    x.onreadystatechange=function(){
        if (this.readyState==4 & this.status==200){
                if (route=="send"){
                    fun(msgId);
                }
                else if(route=="receive"){
                        fun(this.responseText);
                        receive();
                };
        }
    }
    x.send(JSON.stringify(data));
}
catch(err){
    console.log(err.message);
}
}
