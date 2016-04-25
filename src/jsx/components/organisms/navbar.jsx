var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
// bootstrap components
var Glyphicon = require('react-bootstrap').Glyphicon;

var NavItem = require('../atoms/navigation-item.jsx');
var DropDownMenu = require('../molecules/dropdown-menu.jsx');
var SearchForm = require('../molecules/searchform.jsx');

var Navbar = React.createClass({

  render:function(){
    var navlinks = this.props.navData;
    //console.log(navlinks);
    var createNavItem = function(item, id) {
      var linkItem;
      if (item.dropdown){
        linkItem = <DropDownMenu key={id + item.title} item={item} />;
      } else {
        linkItem = <NavItem key={id + item.title} href={item.href} title={item.title} active={item.active} badge={item.badge}/>;
      }
      return linkItem;
    };
    return (
      <nav className="navbar navbar-inverse navbar-primary navbar-fixed-top">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">BRAND</Link>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link activeClassName="active" to="/"><Glyphicon glyph="home" /><span className="sr-only">(current)</span></Link></li>
              {navlinks.map(createNavItem)}
            </ul>
            <SearchForm />
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container-fluid */}
      </nav>
    );
  }
});

module.exports = Navbar;
