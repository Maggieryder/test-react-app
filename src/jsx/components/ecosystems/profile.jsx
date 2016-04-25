var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Bootstrap = require('react-bootstrap');
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var PageHeader = Bootstrap.PageHeader;


var Profile = React.createClass({
  render:function(){
    return (
      <div className="container">
        <PageHeader>
          MY PROFILE
        </PageHeader>
        <Row>
          <Col xs={12} sm={8} lg={9}>
            Hey whassup?
          </Col>
          <Col xs={12} sm={8} lg={3}>
            List of actions to change my profile.
            <ul>
              <li>Update photo</li>
              <li>Update contact info</li>
              <li>Update password</li>
              <li>Update preferences</li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }

});

module.exports = Profile;
