<<<<<<< HEAD
const e=requrie("express");
const app=e();
=======
const a = require("express");
const app = a();
const bd = a.urlencoded({ extended: true });
const m = require("mongodb").MongoClient;
app.use(a.static(__dirname + "/ui"));
app.use(a.json());

//db connection
global.con;
global.from = "n181003@rguktn_ac_in";
global.to = "n181022@rguktn_ac_in";
global.date = new Date();

function dbs() {
    var url = "mongodb://127.0.0.1:27017";

    return new Promise((resolve, reject) => {
        m.connect(url, (err, db) => {
            if (err) throw err;
            dbo = db.db("chat");

            resolve(dbo);
        })
    });


};
dbs().then((i) => {
    con = i;
}).catch((err) => {
    console.log(err);
})

//routing
app.get('/', (req, res) => {
    res.sendFile("./ui/chat.html", { root: __dirname });

});

app.post("/sendAgent", bd, (req, res) => {
    send(req.body);
    res.send("success");

});
app.post("/recieve", (req, res) => {
   recieve();
    function recieve() {
        con.collection("HH").aggregate([
            { $match: { "mail": to } },
            { $project: { "matchingDocs": { $filter: { input: "$" + from, as: "item", cond: { $eq: ["$$item.status", 100] } } } } },
            { $unwind: "$matchingDocs" },
            { $replaceRoot: { newRoot: "$matchingDocs" } }
        ]).toArray((err, result) => {
            if (err) throw err;
            console.log("data is", result);
            if (result.length != 0) {
                res.send(JSON.stringify(result));
                var x = {};
                x[from + ".status"] = 100;
                x["mail"] = to;
                var y = {};
                y[from + ".$[elem].status"] = 200;
                con.collection("HH").updateMany(
                    x,
                    { $set: y },
                    { arrayFilters: [{ "elem.status": 100 }] }, (err, result) => {
                        console.log(result);
                    }
                );
              
            }
            else{
                setTimeout(recieve, 1000);
            }
        })
    }
});
app.listen(8080);

//functions
function send(sendData) {
    con.collection("HH").updateOne({ mail: to }, { "$addToSet": { status: from } }, (err, res) => {
        if (err) throw err;
        let msg = {};
        var time = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + 1 + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();

        msg[to] = { time: time, status: 100, msg: sendData.msg };
        con.collection("HH").updateOne({ mail: from }, { $push: msg }, (err, res) => {
            if (err) throw err;
            console.log(res);
        });


    });

};
>>>>>>> master
