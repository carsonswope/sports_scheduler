var React = require('react');

var NavActions = require('../actions/NavActions');
var NavStore = require('../stores/NavStore');


var Home = require('./navigation/Home');
var Facilities = require('./navigation/Facilities');
var Schedules = require('./navigation/Schedules');
var Leagues = require('./navigation/Leagues');
var Teams = require('./navigation/Teams');
var Webpage = require('./navigation/Webpage');

var NavBar = React.createClass({

  getInitialState: function() {
    return {
      tab: NavStore.currentTab()
    };
  },

  componentDidMount: function() {
    this.navListener = NavStore.addListener(this.changeTab);
  },

  componentWillUnmount: function() {
    this.navListener.remove();
  },

  setTab: function(tab) {
    NavActions.setTab(tab);
  },

  changeTab: function() {
    this.setState({ tab: NavStore.currentTab() });
  },

  render: function() {
    return (
      <div className="navbar-main"
        style={{
          height: this.props.dims.height - 130
        }}>
        <Home         setTab={this.setTab} />
        <Webpage      setTab={this.setTab} />
        <Schedules    setTab={this.setTab} />
        <Leagues      setTab={this.setTab} />
        <Teams        setTab={this.setTab} />
        <Facilities   setTab={this.setTab} />

        {this.state.tab}
      </div>
    );
  }

});

module.exports = NavBar;
