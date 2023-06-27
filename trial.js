const m=require("mongodb").MongoClient;
m.connect("mongodb://127.0.0.1:27017",(err,db)=>{
  if(err)throw err;
  var dbo=db.db("chat");
  dbo.collection("HH").aggregate([
    { $match: { "mail": "n181022@rguktn.ac.in" } },
    { $project: { "matchingDocs": { $filter: { input: "$n181003@rguktn_ac_in", as: "item", cond: { $eq: [ "$$item.status", 100 ] } } } } },
    { $unwind: "$matchingDocs" },
    { $replaceRoot: { newRoot: "$matchingDocs" } }
  ]).toArray((err,res)=>{
    if (err)throw err;
    console.log("data is",res);
   dbo.collection("HH").updateMany(
  { "mail": "n181022@rguktn.ac.in", "n181003@rguktn_ac_in.status": 100 },
  { $set: { "n181003@rguktn_ac_in.$[elem].status": 200 } },
  { arrayFilters: [{ "elem.status": 100 }] },(err,res)=>{
    console.log(res);
  }
);
  });
  
})

  // const MongoClient = require('mongodb').MongoClient;

  // const uri = "mongodb://127.0.0.1:27017";
  // const client = new MongoClient(uri);
  
  // async function run() {
  //   try {
  //     await client.connect();
  //     const database = client.db('chat');
  //     const collection = database.collection('HH');
  
  //     // const pipeline = ;
  
  //     const result = await collection.aggregate([
  //       { $match: { "mail": "n181022@rguktn.ac.in" } },
  //       { $project: { "matchingDocs": { $filter: { input: "$n181003@rguktn_ac_in", as: "item", cond: { $eq: [ "$$item.status", 100 ] } } } } },
  //       { $unwind: "$matchingDocs" },
  //       { $replaceRoot: { newRoot: "$matchingDocs" } }
  //     ]).toArray();
  //     console.log(result);
  
  //   } finally {
  //     await client.close();
  //   }
  // }
  
  // run().catch(console.dir);


db.HH.updateMany(
  { "mail": "n181022@rguktn.ac.in", "n181003@rguktn_ac_in.status": 100 },
  { $set: { "n181003@rguktn_ac_in.$[elem].status": 200 } },
  { arrayFilters: [{ "elem.status": 100 }] }
);
