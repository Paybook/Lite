/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  pbsync: function(req, res) {

    var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));
    options.path += "/users?api_key=" + sails.config.pbsync.api_key;
    apiRest.get(options, function(users){
      res.json(users);
    });
  },

  test: function(req, res) {
    var response = {
      id_user: req.session.id_user,
      token: req.session.token,
    };
    res.view('widget', response);
  },

  accounts: function(req, res){
    var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));

    options.path += "/accounts?token=" + req.session.token;

    apiRest.get(options, function(accounts){
      res.json(accounts);
    });
  }

};

