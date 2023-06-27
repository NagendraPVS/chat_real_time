//sending
content=document.getElementById("chat");

function sendAgent(){
    
    msg={to:"n181003@rguktn.ac.in",
        msg:document.getElementById("msg").value
        };
    x = document.createElement("div");
    x.setAttribute("class", "client");
    x.innerHTML = `<li class="clientchat">${document.getElementById("msg").value}</li>`;
    content.appendChild(x);
    document.getElementById("msg").value="";
   
    ajax("/sendAgent","POST",msg)

};

function ajax(url,method,data){
    try{
    var x=new XMLHttpRequest();
    x.open(method,url,true);
    x.setRequestHeader("content-type","application/json");
    x.onreadystatechange=function (){
        if(this.readyState==4 & this.status==200){
            console.log(this.response);
        }
        
    };
    x.send(JSON.stringify(data));
    }
    catch(err){
            console.log(err);
    }
    

}

//recieving
var a;
function recieve(){
fetch("/recieve",{method:"post"})
.then(
    (res)=>res.json()
)
.then((data)=>{
    recieved(data);
    recieve();
})
.catch((err)=>{
    console.log(err);
});
}
recieve();


//handling data
function recieved(data){
    console.log(data);
    data.forEach((i)=>{
    x = document.createElement("div");
    x.setAttribute("class", "bot");
    x.innerHTML = `<li class="botchat">${i.msg}</li>`;
    content.appendChild(x);
    })
}
