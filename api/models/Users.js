/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        id_user: {
            type: 'string',
            unique: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          } else {
            user.password = hash;
            cb();
          }
        });
      });
    },

    // beforeUpdate: function(user, cb) {
    //   bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //       if (err) {
    //         console.log(err);
    //         cb(err);
    //       } else {
    //         user.password = hash;
    //         cb();
    //       }
    //     });
    //   });
    // },

    afterCreate: function(value, cb){
      var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));
      options.path += "/users?api_key=" + sails.config.pbsync.api_key + "&id_external=" + value.id + "&name=" + value.email;
      apiRest.post(options, function(pbsyncUser){
        Users.update({ id : value.id },{id_user : pbsyncUser.response.id_user}).exec(function(err, updated){
          if (err){
            sails.log.info(err);
            sails.log.info("id_user not updated for: " + value.id);
          }
          cb();
        });
      });
    }
};
