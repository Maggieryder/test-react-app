var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

var Breadcrumb = React.createClass({
  render:function(){
    var activeStyle =  {};
    if (this.props.active){
      activeStyle.color = "#000";
      activeStyle.textDecoration = "none";
      activeStyle.cursor = "default";
    }
    return (
        <li>
          <Link to={this.props.href} style={activeStyle}>{this.props.title}</Link>
        </li>
    );
  }
});

module.exports = Breadcrumb;
