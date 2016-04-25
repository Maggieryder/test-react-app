var Reflux = require('reflux');
var Actions = require('../actions/actions.jsx');

var ModalStore = Reflux.createStore({
  listenables: [Actions],
  showModal:function(action, userData){
    console.log('SHOWING MODAL', action, userData);
    this.show = true;
    this.triggerUpdate(action, userData);
  },
  hideModal:function(){
    console.log('HIDING MODAL');
    this.show = false;
    this.triggerUpdate();
  },
  // refresh data
  triggerUpdate: function(action, userData){
    this.trigger('change', this.show, [action, userData]);
  }
});

module.exports = ModalStore;
