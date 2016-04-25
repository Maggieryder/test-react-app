var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
// bootstrap components
var Glyphicon = require('react-bootstrap').Glyphicon;

var PaginationArrow = React.createClass({
  render:function(){
    var arrow = (this.props.aria === "Previous") ? "glyphicon glyphicon-menu-left" : "glyphicon glyphicon-menu-right";
    return (
      <li>
        <Link to={this.props.link} aria-label={this.props.aria}>
          <small>{(this.props.aria === "Previous") ? <Glyphicon glyph="menu-left" /> : <Glyphicon glyph="menu-right" />}</small>
          <span aria-hidden="true"></span>
        </Link>
      </li>
    );
  }
});

module.exports = PaginationArrow;
