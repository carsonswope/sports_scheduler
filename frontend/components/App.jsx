var React = require('react');
// var DayView = require('./DayView');
// var Calendar = require('./Calendar');
var Header = require('./Header');
var NavBar = require('./NavBar');
var Content = require('./Content');

var NavStore = require('../stores/NavStore');

var UserStore = require('../stores/UserStore');

var LeagueTeamStore = require('../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../stores/LeagueFacilityStore');

var UserActions = require('../actions/UserActions');

var App = React.createClass({

  getInitialState: function() {
    return {

      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },

      user: UserStore.currentUser()

    };
  },

  componentDidMount: function() {
    $(window).on('resize', this.resizeWindow);

    this.userListener = UserStore.addListener(this.userChange);
    UserActions.getCurrentUser();
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  resizeWindow: function() {
    this.setState({
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  },

  userChange: function() {
    this.setState({ user: UserStore.currentUser() });
    if (!this.state.user) { NavStore.reset(); }
  },

  render: function() {

    var header = <Header dims={this.state.dimensions} user={this.state.user} />;
    var navbar = this.state.user ?
      <NavBar dims={this.state.dimensions} /> : null;
    var content = this.state.user ?
      <Content dims={this.state.dimensions}/> : null;

    return (
      <div>
        {header}
        {navbar}
        {content}
    </div>
    );
  }

});

module.exports = App;
