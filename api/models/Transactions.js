/**
* Transactions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id_transaction: {
      type: 'string',
      unique: true
    },
    id_user: {
      type: 'string',
    },
    id_external: {
      type: 'string',
    },
    id_site: {
      type: 'string',
    },
    id_site_organization: {
      type: 'string',
    },
    id_site_organization_type: {
      type: 'string',
    },
    id_account: {
      type: 'string',
    },
    id_account_type: {
      type: 'string',
    },
    is_disable: {
      type: 'boolean',
    },
    description: {
      type: 'string',
    },
    dt_transaction: {
      type: 'date',
    },
    period: {
      type: 'integer',
    },
    date: {
      type: 'integer',
    },
    amount: {
      type: 'float',
    },
    dt_create: {
      type: 'date',
    },
    dt_modify: {
      type: 'date',
    },
  },
  indexes: [
    {
      attributes: {
        id_transaction: 1,
        id_user: 1
      },
      options: {
        unique: true
      }
    }
  ],
  // Lifecycle Callbacks
  beforeValidate: function (values, cb) {

    if (values.dt_transaction !== null){
      values.dt_transaction = new Date(values.dt_transaction * 1000);
    }

    if (values.dt_create !== null){
      values.dt_create = new Date(values.dt_create * 1000);
    }

    if (values.dt_modify !== null){
      values.dt_modify = new Date(values.dt_modify * 1000);
    }

    cb();
  }
};

