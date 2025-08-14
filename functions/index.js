const functions = require("firebase-functions")

exports.helloFunction = functions.https.onRequest((req,res)=>{
  res.json({mssage:"hello , hopefully it will run now"})
})