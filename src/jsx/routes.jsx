var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var useRouterHistory = ReactRouter.useRouterHistory;
var createHashHistory = require('history/lib/createHashHistory');
var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var Shell = require('./components/ecosystems/shell.jsx');
var Home = require('./components/ecosystems/home.jsx');
var Users = require('./components/ecosystems/users.jsx');
var User = require('./components/ecosystems/user.jsx');
var Profile = require('./components/ecosystems/profile.jsx');

var SectionContainer = require('./components/ecosystems/section-container.jsx');
var SectionIndex = require('./components/ecosystems/section-index.jsx');
var Section = require('./components/ecosystems/section.jsx');

var Slide = require('./components/ecosystems/slide.jsx');
var SlideB = require('./components/ecosystems/slide-b.jsx');

//section 1 slides
var Slide11 = require('./components/environments/Slide11.jsx');
var Slide12 = require('./components/environments/Slide12.jsx');
var Slide13 = require('./components/environments/Slide13.jsx');
//chapter 2 slides
var Slide21 = require('./components/environments/Slide21.jsx');
var Slide22 = require('./components/environments/Slide22.jsx');
var Slide23 = require('./components/environments/Slide23.jsx');

var Routes = (
  <Router history={appHistory}>
    <Route name="Home" path="/" component={Shell} >
      <IndexRoute name="Home" component={Home} />
      <Route name="Home" path="/home" component={Home} />
      <Route name="My Profile" path="profile" component={Profile} />
      <Route name="Users" path="/users" component={Users}>
        <Route name="User" path=":id" component={User} />
      </Route>
      {/*<Route name="Slide" path="/slides/:section/:id" component={SlideB}></Route>*/}

      <Route name="Section" path="/section" component={SectionContainer}>
        <Route name="Section" path="/section/:section" component={Section} >
          <IndexRoute name="Index" component={SectionIndex} />
          {/*section 1 slides*/}
          <Route name="Slide 1" path="/section/:section/11" component={Slide11}/>
          <Route name="Slide 2" path="/section/:section/12" component={Slide12}/>
          <Route name="Slide 3" path="/section/:section/13" component={Slide13}/>
          {/*section 2 slides*/}
          <Route name="Slide 1" path="/section/:section/21" component={Slide21}/>
          <Route name="Slide 2" path="/section/:section/22" component={Slide22}/>
          <Route name="Slide 3" path="/section/:section/23" component={Slide23}/>
        </Route>
      </Route>


      {/* default */}
      <Route name="No Match!" path="/*other" component={Home} />
    </Route>
  </Router>
);

module.exports = Routes;
