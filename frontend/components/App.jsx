var React = require('react');
// var DayView = require('./DayView');
// var Calendar = require('./Calendar');
var Header = require('./Header');
var NavBar = require('./NavBar');
var Content = require('./Content');

var Joyride = require('react-joyride');

var NavActions = require('../actions/NavActions');

var AvailabilityStore = require('../stores/AvailabilityStore');
var NavStore = require('../stores/NavStore');
var UserStore = require('../stores/UserStore');
var LeagueTeamStore = require('../stores/LeagueTeamStore');
var LeagueStore = require('../stores/LeagueStore');
var TeamStore = require('../stores/TeamStore');
var LeagueFacilityStore = require('../stores/LeagueFacilityStore');
var FacilityStore = require('../stores/FacilityStore');

var Tour = require('../tour/steps');

var UserActions = require('../actions/UserActions');

var App = React.createClass({

  getInitialState: function() {
    return {
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      },

      user: UserStore.currentUser(),

      joyrideOverlay: false,
      joyrideType: 'continuous',
      ready: false,

      steps: Tour.steps

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
    if (!this.state.user) {
      NavStore.reset();

      this.refs.joyride.reset(false);
    }

  },

  _addStep: function(newStep){
    var steps = this.state.steps;
    steps.push(newStep);
    this.setState({steps: steps});
  },

  _stepCallback: function(step){
      var info = {
        league: LeagueStore.all()[0],
        teams: LeagueTeamStore.teams(league.id),
        facilities: LeagueFacilityStore.facilities(league.id)
      }
      step.preAction(info);
  },

  _completeCallback: function(){
    var step = this.state.steps[0];
    var steps = [step]
    this.setState({
      steps: steps
    });

    this.refs.joyride.reset();
  },

  startTour: function(){
    this.refs.joyride.start(true);
  },

  render: function() {

    var header = <Header dims={this.state.dimensions} user={this.state.user} />;
    var navbar = this.state.user ?
      <NavBar dims={this.state.dimensions} /> : null;
    var content = this.state.user ?
      <Content dims={this.state.dimensions}/> : null;

    if (this.state.user) {
      var toScreen =(
        <div>
          <NavBar dims={this.state.dimensions} />
          <div className='content-main'>
            <Header
              dims={this.state.dimensions}
              user={this.state.user}
              startTour={this.startTour} />
            <Content dims={this.state.dimensions}
              startTour={this.startTour} />
          </div>
        </div>
      );
    } else {
      var toScreen =(
        <div>
          <NavBar dims={this.state.dimensions} hidden={true} />

          <div className='content-main'
            style={{height: this.state.dimensions.height, width: this.state.dimensions.width-225}}>
            <Header dims={this.state.dimensions} user={this.state.user} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Joyride
          debug={true}
          ref='joyride'
          steps={this.state.steps}
          type={this.state.joyrideType}
          showOverlay={this.state.joyrideOverlay}
          locale={{
            close: 'Close',
            next: 'Continue',
            last: 'End',
            skip: 'Exit Tour'
          }}
          showSkipButton={true}
          stepCallback={this._stepCallback}
          completeCallback={this._completeCallback}
          scrollToSteps={false} />

        {toScreen}
      </div>
    );
  }

});

module.exports = App;
