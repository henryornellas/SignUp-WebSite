const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const config = require(__dirname + '/config.js');


const app = express();
const cu = config.mykey;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
  const email = req.body.email
  const password = req.body.password
  console.log(password);
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
      }
    ]
  };
const jsonData = JSON.stringify(data);

const url = 'https://us7.api.mailchimp.com/3.0/lists/06487350f5';

const options = {

  method: 'POST',
  auth: 'henry:' + cu
}

const request = https.request(url, options, function(response){

  if (response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html');
  } else {
    res.sendFile(__dirname + '/failure.html');
  }

  response.on('data', function(data){
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});

app.post('/failure', function(req, res){
  res.redirect('/');
});


















app.listen(process.env.PORT || 3000, function(){
  console.log('FOOOOOOOOOOI');
});
