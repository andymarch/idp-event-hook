'use strict';
let responsePayload = {}

exports.verify = function (req,res){
    console.log("verify action triggered")
  let jsonToken = {}
  jsonToken["verification"] = req.headers['x-okta-verification-challenge']
  res.send(jsonToken)
}

exports.events = function (req,res){
  var i;
  for(i=0; i<req.body.data.events.length;i++){
    console.log(req.body.data.events[i])
    try{
      let eventType = req.body.data.events[i].eventType;
      if(eventType === 'user.session.start'){
        console.log("A session was started")
        if(req.body.data.events[i].outcome.result === 'SUCCESS'){
          console.log("Was successfull")
          console.log("authContext:"+req.body.data.events[i].authenticationContext)
        }
        else{
          console.log("was unsuccessfull")
        }
      }
      else{
        console.log("Unhandled event encountered "+eventType)
      }       
    }
    catch(err){
      console.log("Received invalid data")
      res.status(400).send(responsePayload)
      return
    }
  }
  res.status(204).send(responsePayload)
}