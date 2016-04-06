module.exports = {

    keyCheck : function(){
      if (typeof sails.config.pbsync !== 'object'){
        return false;
      }
      return true;
    }

};
