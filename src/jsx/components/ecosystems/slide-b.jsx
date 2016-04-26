var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var SectionStore = require('../../stores/section-store.jsx');

var PaginationComponent = require('../molecules/pagination-component.jsx');

var Section = React.createClass({
  mixins:[Reflux.listenTo(SectionStore, 'onChange')],
  contextTypes: {
    router: React.PropTypes.object
  },
  handlePaginationClick:function(index){
    var linkTo = '/slides/'+this.props.params.section+'/'+index;
    //var linkTo = `/slide/${this.props.params.section}/${index}`;
    console.log('handle pagination click', linkTo);
    this.context.router.push(linkTo);
  },
  getInitialState: function(){
    return {
      data:[],
      section:{},
      sectionId:undefined,
      slideId:undefined
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

  render: function(){
    if (!this.state.section.slides){
      return (
        <div className="container">
          <h2>Loading...</h2>
        </div>
      );
    }
    return(
      <div className="container">
        <Breadcrumbs crumbs={this.state.section.crumbs} />
        <h1>I AM {this.state.sectionId}</h1>
        <p>currently displaying slide number {this.state.slideId}</p>
        <h2>{this.state.section.title}</h2>
        <h3>{this.state.section.subtitle}</h3>
        <p>{this.state.section.desc}</p>
        <ul>
         {this.state.section.slides.map(function(slide, id){
           return (<li key={id} >{slide.title}</li>);
         })}
        </ul>
        <div className="page-footer">
          <PaginationComponent numPages={this.state.section.slides.length} onPaginationClick={this.handlePaginationClick} />
        </div>
      </div>
    );
  }
});

module.exports = Section;
