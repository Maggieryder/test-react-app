var React = require('react');

var Header = require('../ecosystems/header.jsx');
var Footer = require('../ecosystems/footer.jsx');

var Breadcrumbs = require('react-breadcrumbs');

var Shell = React.createClass({

  render: function(){
    console.log('*********', this.props.routes);
    console.log('*********', this.props.params);
    return(
      <div>
        <Header routes={this.props.routes} params={this.props.params}/>
        <div id="content">
          <div className="container">
            <Breadcrumbs
              routes={this.props.routes}
              params={this.props.params}
              separator=" / "
              setDocumentTitle={true}
            />
          </div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Shell;
