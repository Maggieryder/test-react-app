var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
  render: function(){
    return(
      <div className="container" >
        <div className="jumbotron">
          <h1>Hello, world!</h1>
          <p>...</p>
          <p><Link className="btn btn-primary btn-lg" to="/section/1" role="button">Get Started >></Link></p>
        </div>
      </div>
    );
  }
});

module.exports = Home;
