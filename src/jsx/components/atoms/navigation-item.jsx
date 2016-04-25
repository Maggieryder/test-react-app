var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Badge = require('../atoms/badge.jsx');

var NavigationItem = React.createClass({

  render:function(){
    var listClass = '';
    if (this.props.active){
      listClass = 'active';
    }

    return (
      <li className={listClass}>
        <Link activeClassName="active" to={this.props.href} params=''>{this.props.title} {this.props.badge ? <Badge text={this.props.badge} /> : ''}</Link>
      </li>
    );
  }
});

module.exports = NavigationItem;
