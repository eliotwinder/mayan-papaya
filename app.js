var politifacts = require('./server/models/trivia/politifacts');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();


require('./server/config/middleware.js')(app, express);

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/TriviaWithFriends';

mongoose.connect(mongoURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db success');
});

// server-side socket.io
require('./server/config/serversocketio.js')(app);

// politifacts.getPolitifacts('donald-trump');

// only run server if app.js was run directly (rather than being
// imported as a module)
if (!module.parent) {
  var port = process.env.PORT || 3000;

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;






