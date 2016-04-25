var React = require('react');
// bootstrap components
var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var PageHeader = Bootstrap.PageHeader;

var Slide13 = React.createClass({
  render: function(){
    return(
      <div>
        <PageHeader>
          SLIDE 3 header <small>stay forever young!</small>
        </PageHeader>
        <Row>
          <Col xs={12} sm={6} lg={4}>
            <img style={{width:'100%'}}  src="./images/IMG_0008.JPG"/>
          </Col>
          <Col xs={12} sm={6} lg={8}>
            <h6>IS ANYTHING EXCITING ABOUT TO HAPPEN?</h6>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Slide13;
