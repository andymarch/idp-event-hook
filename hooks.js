'use strict';

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
      if(req.body.data.events[i].target.length == 1){
        console.log(eventType + " was triggered for user '" + 
                    req.body.data.events[i].target[0].displayName + "'") 
      }
      else{
        console.log(eventType + " was triggered for user '" +
                    req.body.data.events[i].target[0].displayName + 
                   "' on '" + req.body.data.events[i].target[1].displayName + "'")
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