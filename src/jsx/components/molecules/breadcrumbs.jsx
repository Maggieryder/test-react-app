var React = require('react');

var Breadcrumb = require('../atoms/breadcrumb.jsx');

var Breadcrumbs = React.createClass({
  render:function(){
    return (
      <ol className="breadcrumb">
        {this.props.crumbs.map(function(crumb, id){
          //console.log(crumb);
          return <Breadcrumb
            key={id + crumb.title}
            href={crumb.href}
            title={crumb.title}
            active={crumb.active}/>;
        })}
      </ol>
    );
  }
});

module.exports = Breadcrumbs;
