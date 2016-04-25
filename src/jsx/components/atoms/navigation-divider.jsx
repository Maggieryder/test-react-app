var React = require('react');

var NavigationDivider = React.createClass({
  render:function(){
    return (
      <li role="separator" className="divider"></li>
    );
  }
});

module.exports = NavigationDivider;
