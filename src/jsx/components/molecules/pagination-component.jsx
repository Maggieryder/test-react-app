var React = require('react');
// bootstrap components
var Bootstrap = require('react-bootstrap');
var Pagination = Bootstrap.Pagination;
var Glyphicon = Bootstrap.Glyphicon;
var FontAwesome = require('react-fontawesome');

var PaginationComponent = React.createClass({
  getInitialState:function() {
    return {
      activePage: 1
    };
  },
  componentWillMount: function(){
    this.setState({
      activePage:this.props.activePage
    });
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      activePage:nextProps.activePage
    });
  },

  handleSelect:function(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    });
    this.props.onPaginationClick(selectedEvent.eventKey);
  },

  render:function() {
    var arrowL = <small><Glyphicon glyph="menu-left" /></small>;
    var arrowR = <small><Glyphicon glyph="menu-right" /></small>;
    //
    return (
      <Pagination
        prev={arrowL}
        next={arrowR}
        ellipsis
        items={this.props.numPages}
        maxButtons={10}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  }

});

module.exports = PaginationComponent;
