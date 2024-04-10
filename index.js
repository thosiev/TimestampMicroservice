// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(function(reg, res, next) {
  console.log(reg.method+" " + reg.path +" - " + reg.ip)
  next()
})


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { param } = require('express/lib/application');
const { json } = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function(reg, res){
  
  let param = reg.params.date
  
  // check for empty parameter
  if (typeof param == "undefined") {
    param = new Date()
  }
  // check for unix timecode
  else if (/^\d{5,}$/.test(param)) {
    param = new Date(parseInt(param));
  }

  if (new Date(param) == "Invalid Date"){
    res.json({
      error: "Invalid Date" 
    })
  } else {
    date = new Date (param)
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
}
  
})
