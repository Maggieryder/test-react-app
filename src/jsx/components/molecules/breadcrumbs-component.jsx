var React = require('react');
// bootstrap components
var Breadcrumb = require('react-bootstrap').Breadcrumb;
var BreadcrumbItem = require('react-bootstrap').BreadcrumbItem;

var BreadcrumbComponent = React.createClass({
  render:function(){
    //console.log(this.props.crumbs);
    return (
      <Breadcrumb>
        {this.props.crumbs.map(function(crumb, id){
          return <BreadcrumbItem key={id} href={crumb.active ? null : crumb.href} active={crumb.active ? true : false} >{crumb.title}</BreadcrumbItem>;
        })}
      </Breadcrumb>
    );
  }
});

module.exports = BreadcrumbComponent;
