var React = require('react');

var SectionContainer = React.createClass({
  render:function(){
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});

module.exports = SectionContainer;