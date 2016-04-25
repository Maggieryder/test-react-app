var React = require('react');

var SearchField = React.createClass({
  getInitialState:function(){
    return {value:""};
  },
  onChange:function(e){
    this.setState({value:e.target.value});
  },
  clear:function(){
    this.setState({value:""});
  },
  render:function(){
    return (
        <input type="text" className="form-control" onChange={this.onChange} placeholder="Search" value={this.state.value}/>
    );
  }
});

module.exports = SearchField;
