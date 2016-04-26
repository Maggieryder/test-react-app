var API = require('../../api/api');
var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');

var UserStore = Reflux.createStore({
  listenables: [Actions],
  getUser: function(id){
    console.log("GET USER :", id);
    API.get('/api/user/'+id)
      .then(function(json){
        //console.log("GET USER RESPONSE :", json);
        this.user = json;
        // refresh USER!!
        this.triggerUpdate();
      }.bind(this));
  },
  // refresh data
  triggerUpdate: function(){
    this.trigger('change', this.user);
  }
});

module.exports = UserStore;
