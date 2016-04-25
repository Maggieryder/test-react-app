var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var SectionStore = require('../../stores/section-store.jsx');

//var SectionIndex = require('./section-index.jsx');
var PaginationComponent = require('../molecules/pagination-component.jsx');

var Section = React.createClass({
  mixins:[Reflux.listenTo(SectionStore, 'onChange')],
  contextTypes: {
    router: React.PropTypes.object
  },
  handlePaginationClick:function(index){
    var linkTo = '/section/'+this.props.params.section+'/'+this.props.params.section+''+index;
    //var linkTo = `/slide/${this.props.params.section}/${index}`;
    console.log('handle pagination click', linkTo);
    this.context.router.push(linkTo);
  },
  getInitialState: function(){
    return {
      data:[],
      section:{},
      sectionId:undefined,
      slideId:0
    };
  },
  componentWillMount: function(){
    Actions.getSections();
  },
  componentWillReceiveProps: function(nextProps){
    if (this.state.data){
      this.setState({
        section:this.state.data['section'+nextProps.params.section],
        sectionId:'section'+nextProps.params.section,
        slideId:nextProps.params.id
      });
    }
  },
  onChange: function(e, json){
    console.log('onChange', json);
    this.setState({
      data:json,
      section:json['section'+this.props.params.section],
      sectionId:'section'+this.props.params.section,
      slideId:this.props.params.id
    });
  },
  pagination:function(){
    //console.log('>>>>>this.props.location.pathname',this.props.location.pathname.split(''));
    var pathArr = this.props.location.pathname.split('section/');
    console.log("pathArr[1].indexOf('/')",pathArr[1].lastIndexOf('/'));
    var endOfPath = pathArr[1].split('');
    var lastIndex = parseInt(endOfPath.pop());
    console.log('>>>>>lastIndex',lastIndex);
    if (this.state.section.slides){
      return (pathArr[1].lastIndexOf('/')!== -1) ? <PaginationComponent numPages={this.state.section.slides.length} onPaginationClick={this.handlePaginationClick} activePage={lastIndex} /> : null;
    } else {
      return null;
    }

  },

  render: function(){
    //console.log(this.state.section.slides);
    if (!this.state.section){
      return (
        <div className="container">
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="container">
        {this.props.children}
        <div className="page-footer">
          {this.pagination()}
        </div>
      </div>
    );
  }
});

module.exports = Section;
