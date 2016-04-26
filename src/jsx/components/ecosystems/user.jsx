var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var UserStore = require('../../stores/user-store.jsx');

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Panel = Bootstrap.Panel;
var Image = Bootstrap.Image;
var Button = Bootstrap.Button;
//var Glyphicon = Bootstrap.Glyphicon;

var User = React.createClass({
  mixins:[Reflux.listenTo(UserStore, 'onChange')],
  defaultUser: function(){
    return {
      name:"No user selected!",
      avatar:"./images/default.png",
      favorite:{food:"", color:""}
    };
  },
  getInitialState:function(){
    return {user: this.defaultUser()};
  },
  componentWillMount: function(){
    if (this.props.params){
      Actions.getUser(this.props.params.id);
    }
  },
  componentWillReceiveProps: function(nextProps){
    if (this.props.params){
      console.log("nextProps.params.id ", nextProps.params.id);
      Actions.getUser(nextProps.params.id);
    }
  },
  onChange: function(e, json){
    console.log('CURRENT USER', json);
    this.setState({user: json || this.defaultUser()});
  },
  confirmDelete:function(user){
    Actions.showModal('DELETE', this.state.user);
  },
  handleEdit: function(){
    Actions.showModal('EDIT', this.state.user);
  },

  render: function(){
    var title = <h2>{this.state.user.name}</h2>;
    var favFood = 'Favorite food : '+this.state.user.favorite.food;
    var footerContent = this.state.user.name !== 'No user selected!' ?
      <div style={{textAlign:'right'}}>
        <Button bsStyle="default" style={{marginRight:'10px'}} onClick={this.handleEdit}>EDIT</Button>
        <Button bsStyle="default" onClick={this.confirmDelete}>DELETE</Button>
      </div> : null;
    return(
      <Panel bsStyle="default" header={title} footer={footerContent}>
        <div style={{width:"250px"}}>
          <Image src={this.state.user.avatar} responsive rounded />
        </div>
        <h4>{favFood}</h4>
      </Panel>
    );
  }
});

module.exports = User;
