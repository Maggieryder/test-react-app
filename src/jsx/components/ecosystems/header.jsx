var React = require('react');

var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var UsersStore = require('../../stores/users-store.jsx');

var Navbar = require('../organisms/navbar.jsx');

var Header = React.createClass({
  mixins:[Reflux.listenTo(UsersStore, 'onChange')],
  getInitialState: function(){
    return {
      numUsers:"0"
    };
  },
  componentWillMount: function(){
    Actions.getUsers();
  },
  onChange: function(e, json){
    this.setState({numUsers: json.length});
  },
  render: function(){
    var navLinks = [
      {
        title:"Users",
        href:"users",
        badge:this.state.numUsers
      },
      {
        title:"Profile",
        href:"profile"
      },
      {
        title:"Sections",
        dropdown:[
          {
            title:"Section 1",
            href:"section/1"
          },
          {
            title:"Section 2",
            href:"section/2"
          },
          {
            title:"Section 3",
            href:"section/3"
          },
          {
            role:"separator",
          },
          {
            title:"Glossary",
            href:"glossary"
          }
        ]
      }
    ];
    return (
      <header>
        <Navbar navData={navLinks}/>
      </header>
    );
  }
});

module.exports = Header;
