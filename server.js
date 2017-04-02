'use strict';

var express = require('express');

var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/icons', express.static(__dirname + '/icons'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/plugins', express.static(__dirname + '/plugins'));
app.use('/bootstrap-assets', express.static(__dirname + '/bootstrap-assets'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req,res){
  res.status(200).sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || '8080', function(){
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit')
});
/*set port
var port = process.env.PORT || 8080

app.use(express.static(__dirname));

//routes
app.get("/", function(req, res) {
  res.render("index");
})

app.listen(port, function(){
  console.log("app_running");
})
*/
