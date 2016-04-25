var React = require('react');
var PaginationItem = require('../atoms/navigation-item.jsx');
var PaginationArrow = require('../atoms/pagination-arrow.jsx');

var Pagination = React.createClass({
  prevSlide:function(){
    console.log("section ", this.props.section);
    var linkTo = "/slide"+String(this.props.section)+Math.max(1,parseInt(this.props.currentId)-1);
    console.log("PREV to ", linkTo);
    return linkTo;
  },
  nextSlide:function(){
    var numSlides = parseInt(this.props.pages.length);
    console.log("numSlides ", this.props.pages.length);
    console.log("section ", this.props.section);
    var linkTo = "/slide"+String(this.props.section)+Math.min(numSlides,parseInt(this.props.currentId)+1);
    console.log("NEXT to ", linkTo);
    return linkTo;
  },
  render:function(){
    //console.log(this.props.pages);
    return (
      <nav className="col-sm-4 offset-4">
        <ul className="pagination">
        <PaginationArrow aria="Previous" link={this.prevSlide()} />
          {this.props.pages.map(function(page, id){
            return <PaginationItem
              key={id + page.link}
              href={page.link}
              title={page.index}
              active={page.active}/>;
          })}
          <PaginationArrow aria="Next" link={this.nextSlide()} />
        </ul>
      </nav>
    );
  }
});

module.exports = Pagination;
