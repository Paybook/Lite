var https = require('https');

// API rest service
module.exports = {

  post: function(options, cb){

    options.method = "POST";
    https.request(options, function(response) {
      sails.log(options);

      var responseData = '';
      response.setEncoding('utf8');

      response.on('data', function(chunk){
        responseData += chunk;
      });

      response.once('error', function(err){
        cb(err);
      });

      response.on('end', function(){
        try {
          var output = JSON.parse(responseData);
          cb(output);
        } catch (e) {
          sails.log.warn('Could not parse response from ' + options.hostname + ': ' + e);
        }
      });
    }).end();
  },

  get: function(options, cb){

    options.method = "GET";
    https.request(options, function(response) {
      sails.log(options);

      var responseData = '';
      response.setEncoding('utf8');

      response.on('data', function(chunk){
        responseData += chunk;
      });

      response.once('error', function(err){
        cb(err);
      });

      response.on('end', function(){
        try {
          var output = JSON.parse(responseData);
          cb(output);
        } catch (e) {
          sails.log.warn('Could not parse response from ' + options.hostname + ': ' + e);
        }
      });
    }).end();
  },

};
