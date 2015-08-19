var request = require('request');

module.exports = {
  getPolitifacts: function(name, callback){
    var formattedName = name.split(' ').join('-');
    var requestUrl = 'http://www.politifact.com/api/statements/truth-o-meter/people/' + name + '/json/?n=10';
    request(requestUrl, function (error, response, body) {
      var data = JSON.parse(body);
      callback(data);
    });
  },
};