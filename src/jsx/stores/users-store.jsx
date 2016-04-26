var API = require('../../api/api');
var _ = require('lodash');
var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');

var UsersStore = Reflux.createStore({
  listenables: [Actions],
  getUsers: function(){
    API.get('/api/users')
    .then(function(json){
      //this.console(json, "GET ALL USERS");
      this.users = json;
      // refresh data
      this.triggerUpdate();
    }.bind(this));
  },
  findUser: function(id){
    var user = _.find(this.users, { 'id': id });
    if (user){
      return user;
    } else {
      //this.getUser(id);
      return null;
    }
  },
  addUser:function(user){
    console.log(">>>>>>add user ", user);
    if (!this.users){
      this.users = [];
    }
    user.id = "u-"+Math.floor(Date.now()/1000);
    // refresh view
    this.users.unshift(user);
    // refresh data
    this.triggerUpdate();
    // update server
    API.post('/api/users', user)
    .then(function(response){
      this.console(response, "ADD");
      // refresh data
      this.getUsers();
      //Actions.getUser(0);
    }.bind(this));
  },
  updateUser: function(user){
    console.log(">>>>>> UPDATE user ", user.id);
    if (_.find(this.users, { 'id': user.id })){
      var i = _.findIndex(this.users, {id:user.id});
      //console.log(">>>>>> UPDATE indexOf ", i);
      //this.users.splice(i,1,user);
      this.users[i] = user;
      this.triggerUpdate();
      API.post('/api/users', user)
      .then(function(response){
        this.console(response, "UPDATE");
        //this.getUsers();
        // refresh data
        //this.triggerUpdate();
        this.getUsers();
        Actions.getUser(i);
      }.bind(this));
    }
  },
  deleteUser:function(user){
    console.log(">>>>>> DELETE user ", user.id);
    // refresh view
    var i = this.users.indexOf(user);
    //console.log(">>>>>> DELETE indexOf ", i);
    this.users.splice(i,1);
    // refresh data
    this.triggerUpdate();
    API.delete('/api/users/'+user.id)
     .then(function(response){
       this.console(response, "DELETE");
       // refresh data
       //this.triggerUpdate();
      this.getUsers();
     }.bind(this));
  },
  console:function(response, action){
    var msg='';
    if (response.status === 200){
      msg = "User "+action+" successfull!";
    } else {
      msg = "User "+action+" failed!";
    }
    console.log(msg);
  },
  // refresh data
  triggerUpdate: function(){
    this.trigger('change', this.users);
  }
});

module.exports = UsersStore;
