var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var UsersStore = require('../../stores/users-store.jsx');
var ModalStore = require('../../stores/modal-store.jsx');
var _ = require('lodash');

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Panel = Bootstrap.Panel;
var Image = Bootstrap.Image;
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var Button = Bootstrap.Button;
var Glyphicon = Bootstrap.Glyphicon;

var User = require('../ecosystems/user.jsx');
var ModalInstance = require('../ecosystems/modal.jsx');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


var Users = React.createClass({
  mixins:[
    Reflux.listenTo(UsersStore, 'onChange')
  ],
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      users:[],
      currentId:-1
    };
  },
  componentWillMount: function(){
    Actions.getUsers();
  },
  componentWillReceiveProps: function(nextProps){
    console.log("USERS : nextProps.params.id ", nextProps.params.id);
    this.setState({currentId:nextProps.params.id});
  },
  onChange: function(e, json){
    console.log('onChange num objects', json.length);
    //var id = this.props.params.id || 0;
    this.setState({
      users:json,
      currentId:this.props.params.id
    });
  },
  handleSubmit: function(user){
    console.log('SUBMIT USER with id', user.id);
    var userData = this.state.users;
    if (!user.id){
      console.log("ADDING USER");
      var newUserData = userData.concat(user);
      this.setState({users: newUserData});
      Actions.addUser(user);
      this.context.router.push('users/0');
    } else {
      console.log("UPDATING USER");
      var i = _.findIndex(userData, {id:user.id});
      userData[i] = user;
      this.setState({users: userData});
      Actions.updateUser(user);
      //this.context.router.push('users/'+i);
    }
  },
  handleDelete: function(user){
    console.log('DELETE USER with id', user.id);
    Actions.deleteUser(user);
    this.context.router.push('users');
  },
  handleAdd:function(){
    Actions.showModal('ADD');
  },
  render:function(){
    var self = this;

    var userList = this.state.users.map(function(user, id){
        return  <ListGroupItem header={user.name} key={user.id} href={"#users/"+id} disabled={parseInt(self.state.currentId) === id}>
                  {user.favorite.color}
                  {/*<Button bsStyle="danger" style={{float:'right'}} onClick={self.handleDelete} >Delete</Button>*/}
                </ListGroupItem>;
        });

    var emptyUser = <Panel header='PLEASE SELECT USER' className="fill">
                      <div style={{width:"250px"}}>
                        <Image src="./images/default.png" responsive rounded />
                      </div>
                    </Panel>;
    return (
      <div className="container">
        <Row>
          <Col xs={12} sm={4} lg={3}>
            <h3>USERS <Button bsStyle="default" style={{float:'right', paddingRight:'11px'}} onClick={this.handleAdd} ><Glyphicon glyph="plus" /></Button></h3>
            <ListGroup>
              {userList}
            </ListGroup>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <h3>CURRENT USER</h3>
            <div className="fill">
              {this.props.children || emptyUser }
            </div>
          </Col>
        </Row>
        <ModalInstance
          onSubmitUser={this.handleSubmit}
          onDeleteUser={this.handleDelete}
          />
      </div>
    );
  }
});

module.exports = Users;
