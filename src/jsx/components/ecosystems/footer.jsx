var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Footer = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <Row>
            <Col xs={12} sm={6} lg={4}>
              <h6 style={{marginTop:18}}>Copyright &copy; BrandName, 2016. All rights reserved.</h6>
            </Col>
          </Row>
        </div>
      </nav>
    );
  }
});

module.exports = Footer;
