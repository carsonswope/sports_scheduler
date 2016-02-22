var React = require('react');
var DayView = require('./DayView');
var Calendar = require('./Calendar');
var Header = require('./Header');
var NavBar = require('./NavBar');
var Content = require('./Content');

var FacilityStore = require('../stores/FacilityStore.js');
var FacilityActions = require('../actions/FacilityActions.js');

var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var App = React.createClass({

  getInitialState: function() {
    return {
      facilities: [],

      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },

      user: UserStore.currentUser()

    }
  },

  componentDidMount: function() {

    $(window).on('resize', this.resizeWindow);

    this.facilityListener =
      FacilityStore.addListener( this.facilityChange );

    this.userListener = UserStore.addListener(this.userChange);

    UserActions.getCurrentUser();
  },

  componentWillUnmount: function() {
    this.facilityListener.remove();
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

  facilityChange: function() {
    this.setState({
      facilities: FacilityStore.all()
    });
  },

  userChange: function() {
    this.setState({ user: UserStore.currentUser() });
    FacilityActions.fetch();
  },

  render: function() {

    var navbar = this.state.user ?
      <NavBar dims={this.state.dimensions} /> : null;
    var content = this.state.user ?
      <Content dims={this.state.dimensions}/> : null;

    return (
      <div>
        <Header dims={this.state.dimensions} user={this.state.user} />
        {navbar}
        {content}
    </div>
    );
  }

});

module.exports = App;
