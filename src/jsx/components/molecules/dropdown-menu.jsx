var React = require('react');

var NavigationItem = require('../atoms/navigation-item.jsx');
var NavigationDivider = require('../atoms/navigation-divider.jsx');

var DropDownMenu = React.createClass({

  render:function(){
    var items = this.props.item.dropdown;
    var createItem = function(item, id){
      var subnavItem;
      if (item.role==="separator"){
        subnavItem = <NavigationDivider key={id + item.role} />;
      } else {
        subnavItem = <NavigationItem
          key={id + item.title}
          href={item.href}
          title={item.title} />;
      }
      return subnavItem;
    };
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.item.title}<span className="caret"></span></a>
        <ul className="dropdown-menu">
          {items.map(createItem)}
        </ul>
      </li>

    );
  }
});

module.exports = DropDownMenu;
