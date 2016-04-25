var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions/actions.jsx');
var SectionStore = require('../../stores/section-store.jsx');

var ListGroup = require('../molecules/listgroup.jsx');

var SectionIndex = React.createClass({
  mixins:[Reflux.listenTo(SectionStore, 'onChange')],
  getInitialState: function(){
    return {data:undefined, section:undefined};
  },
  componentWillMount: function(){
    Actions.getSections();
  },
  componentWillReceiveProps: function(nextProps){
    if (this.state.data){
      console.log('componentWillReceiveProps >> section id ', nextProps.params.section);
      this.setState({section:this.state.data['section'+ nextProps.params.section]});
    }
  },
  onChange: function(e, json){
    console.log(json);
    console.log('onChange section id ', this.props.params.section);
    this.setState({
      data:json,
      section:json['section'+ this.props.params.section]
    });
  },
  render: function(){
    if (this.state.section){
      return(
        <div>
          <div className="page-header">
            <h1>{this.state.section.title} <small>{this.state.section.subtitle}</small></h1>
            <p>{this.state.section.desc}</p>
          </div>
          <ListGroup slides={this.state.section.slides} toc={this.state.section.toc}/>
        </div>
      );
    } else {
      return (<div>No content</div>);
    }
  }
});

module.exports = SectionIndex;
