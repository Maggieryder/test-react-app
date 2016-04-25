var API = require('../../api/api');
var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');

var SectionStore = Reflux.createStore({
  listenables: [Actions],
  getSections: function(){
    API.get('/api/sections')
    .then(function(json){
      this.sections = json;
      this.triggerUpdate();
    }.bind(this));
  },
  // refresh data
  triggerUpdate: function(){
    this.trigger('change', this.sections);
  }
});

module.exports = SectionStore;
