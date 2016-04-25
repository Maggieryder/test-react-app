var React = require('react');

var Badge = React.createClass({
  render:function(){
    return (
        <span className="badge">{this.props.text}</span>
    );
  }
});

module.exports = Badge;
