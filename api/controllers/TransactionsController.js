/**
 * TransactionsController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  account: function(req, res){

    var response = {
      host: sails.config.pbsync.host_files,
    };

    var id_account = req.param('id_account');
    req.session.id_account = id_account;

    var options = JSON.parse(JSON.stringify(sails.config.pbsync.options));
    options.path += "/transactions?token=" + req.session.token + "&id_account=" + id_account;

    Transactions.
    find({id_account: id_account}).
    sort('date DESC').
    limit(1).
    then(function(transaction){
      if (transaction === undefined || transaction.length === 0){
        sails.log("No transactions found");

        apiRest.get(options, function(transactions){

          Transactions.
          create(transactions.response).
          exec(function(err, created){
            if (err){
              sails.log("Error creating transactions records: " + err);
              return false;
            }

            return true;
          });

        });
      }

      return transaction;

    }).
    then(function(transaction){
      sails.log("Transaction: " + JSON.stringify(transaction));
      return true;
    });

    response.id_account = id_account;

    Accounts.
    find({id_account: id_account}).
    then(function(account){
      sails.log(account);
      response.account = account[0];

      res.view('transactions', response);
    });
  },

  count:function (req, res){
    Transactions.count({id_account: req.session.id_account}).exec(function(error,count){
      return res.json({
        count: count
      });
    });
  },

};

