var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Badge = require('./badge.jsx');

var ListGroupItem = React.createClass({
  render:function(){
    var className = this.props.active ? "list-group-item active" : "list-group-item";
    var badge = this.props.badge ? <Badge text={this.props.badge} /> : '';
    return (
      <Link to={this.props.href} className={className}>{this.props.title} {this.props.badge ? <Badge text={this.props.badge} /> : ''}</Link>
    );
  }
});

module.exports = ListGroupItem;
