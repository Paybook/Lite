/**
* Attachments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id_attachment: {
      type: 'string',
      unique: true
    },
    id_account: {
      type: 'string',
    },
    id_attachment_type: {
      type: 'string',
    },
    id_site: {
      type: 'string',
    },
    id_site_type: {
      type: 'string',
    },
    id_transaction: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    extension: {
      type: 'string',
    },
    size: {
      type: 'integer',
    },
    url: {
      type: 'string',
    },
    dt_create: {
      type: 'date',
    },
    dt_modify: {
      type: 'date',
    },
  },

  // Lifecycle Callbacks
  beforeValidate: function (values, cb) {

    if (values.dt_create !== null){
      values.dt_create = new Date(values.dt_create * 1000);
    }

    if (values.dt_modify !== null){
      values.dt_modify = new Date(values.dt_modify * 1000);
    }

    cb();
  }
};

