var React = require('react');

var SearchField = require('../atoms/searchfield.jsx');

var SearchForm = React.createClass({
  onSubmit:function(e){
    e.preventDefault();
    console.log("SEARCHING FOR ", this.refs.srchField.state.value);
    this.refs.srchField.clear();
  },
  render:function(){
    return (
      <form className="navbar-form navbar-right" role="search">
        <div className="input-group">
            <SearchField ref="srchField"/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.onSubmit}><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            </span>
        </div>
      </form>
    );
  }
});

module.exports = SearchForm;
