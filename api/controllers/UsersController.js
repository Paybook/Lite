/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  pbsync: function(req, res) {

    // Create user on pbsync
    var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));
    options.path += "/users?api_key=" + sails.config.pbsync.api_key;
    apiRest.get(options, function(users){
      res.json(users);
    });
  }

};

