var React = require('react');

var ListGroupItem = require('../atoms/listgroup-item.jsx');

var ListGroup = React.createClass({
  render:function(){
    return (
      <div className="list-group">
        <ListGroupItem title={this.props.toc.title} href={this.props.toc.href} badge={this.props.toc.badge} active/>
        {this.props.slides.map(function(slide){
          console.log(slide);
          return <ListGroupItem
            key={slide.id}
            href={slide.href}
            title={slide.title}
            badge={slide.badge}
            active={slide.active}/>;
        })}
      </div>
    );
  }
});

module.exports = ListGroup;
