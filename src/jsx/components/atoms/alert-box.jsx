var React = require('react');

var AlertBox = React.createClass({
  render:function(){
    return (
        <div className={"alert alert-"+this.props.type}>{this.props.text}</div>
    );
  }
});

module.exports = AlertBox;
