'use strict'

//start by requiring the following packages 

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()        

//set the port to 8000 (the port we used with ngrok )

app.set('port', (process.env.PORT || 8000 ))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// setup a route 
app.get('/', function (req, res) {
    res.send("Hello , I'm a bot ")
});

app.listen(app.get('port'), function() {
    console.log('server running at : ', app.get('port'))
});

const FACEBOOK_VERIFY_CODE = '0123456789';

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === FACEBOOK_VERIFY_CODE) {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error : wrong token');
})