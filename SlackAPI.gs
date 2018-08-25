//********************************************************************
//Webhook Functions
//********************************************************************

//Send data payload to Slack webhook
//*******************************************

function sendPayload(payload, method, url){
  if (!url){
    var url = getProperty("SLACK_INCOMING_WEBHOOK");
    }
  var options = {
    'method': method,
    'payload': JSON.stringify(payload)
   };
   
  var status = UrlFetchApp.fetch(url,options);
  return status;
}

//Send data payload to user via private message
//*******************************************

function sendPrivatePayload(userID,payload,api_token) {
  var jsonToken = 'Bearer '+api_token; 
  var options = {
    'method': 'post',
    'headers': {'Authorization': jsonToken},
    'contentType': 'application/json;charset=utf-8',
    'payload': JSON.stringify(payload)
  };  
  var status = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage',options);
  return status;
}


//Function to post text to Slack webhook
//*******************************************

function sendMessage(message,url){
  var payload = {
    "text": message
  };
  
  if (!url){
    var url = getProperty("SLACK_INCOMING_WEBHOOK");
  }

  var options = {
    'method': 'post',
    'payload': JSON.stringify(payload)
  };
  
  var status = UrlFetchApp.fetch(url, options);
  return status;
}

//********************************************************************
//API Calls
//********************************************************************


//Open dialog box. JSON payload.
//*******************************************

function openDialog(payload, api_token) {
  var jsonToken = 'Bearer '+api_token;
  var options = {
    'method': 'post',
    'headers': {'Authorization': jsonToken},
    'contentType': 'application/json;charset=utf-8',
    'payload': JSON.stringify(payload)
  };     
  var status = UrlFetchApp.fetch('https://slack.com/api/dialog.open',options); 
  return status;
}

//Send a user a private message via SlackBot.
//*******************************************

function sendPrivateMessage(userID,message,api_token) {
  var jsonToken = 'Bearer '+api_token; 
  var options = {
    'method': 'post',
    'headers': {'Authorization': jsonToken},
    'contentType': 'application/json;charset=utf-8',
    'payload': JSON.stringify({ 'channel': userID, 'text': message})
  };  
  var status = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage',options);
  return status;
}

//Query the User Object for a given userID
//*******************************************

function queryUserInfo(userID,api_token) {
  var payload = {token: api_token, user: userID};
  var url = "https://slack.com/api/users.info";
  var options = {
    'method': 'get',
    'payload': payload
  };
  var userInfo = JSON.parse(UrlFetchApp.fetch(url, options));
  return userInfo;
}

//Return the value of the given script property
//Standard Utility
//*******************************************
function getProperty(propertyName){
  return PropertiesService.getScriptProperties().getProperty(propertyName);
}
