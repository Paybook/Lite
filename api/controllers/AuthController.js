var passport = require('passport');

module.exports = {

    _config: {
      actions: false,
      shortcuts: false,
      rest: false
    },

    login: function(req, res) {

      var pbsync = validate.keyCheck();
      if (!pbsync){
        res.json({error: 'Missing api_key'});
        return false;
      }

      passport.authenticate('local', function(err, user, info) {
        if ((err) || (!user)) {
          return res.send({
            message: info.message,
            user: user
          });
        }

        req.logIn(user, function(err) {
          if (err) res.send(err);

          // Get token from pbsync
          var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));
          options.path += "/sessions?api_key=" + sails.config.pbsync.api_key + "&id_user=" + user.id_user;
          apiRest.post(options, function(session){

            // Set token on session
            req.session.token = session.response.token;
            req.session.id_user = user.id_user;

            res.redirect('/accounts');
          });
        });

      })(req, res);
    },

    logout: function(req, res) {
      req.logout();
      res.redirect('/login');
    },

    session: function(req,res) {
      var pbsync = validate.keyCheck();
      if (!pbsync){
        res.json({error: 'Missing api_key'});
        return false;
      }

      session = {status:req.isAuthenticated()};

      return res.json(session);
    }
};
