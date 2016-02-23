var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../stores/NavStore');

var FacilityActions = require('../actions/FacilityActions');
var EventActions = require('../actions/EventActions');
var LeagueActions = require('../actions/LeagueActions');
var TeamActions = require('../actions/TeamActions');

var NavConstants = require('../constants/NavConstants');

var TeamsPage = require('./mainPages/TeamsPage');


var Content = React.createClass({

  getInitialState: function() {
    return { tab: NavStore.currentTab() };
  },

  componentDidMount: function() {
    this.navListener = NavStore.addListener(this.navChange);

    FacilityActions.fetch();
    EventActions.fetch();
    LeagueActions.fetch();
    TeamActions.fetch();

  },

  componentDidDismount: function() {
    this.navListener.remove();
  },

  navChange: function() {
    this.setState({ tab: NavStore.currentTab() });
  },

  render: function() {

    var ToRender = NavConstants.PAGES[this.state.tab];

    return (

      <div className="content-main"
        style={{
          height: this.props.dims.height - 130,
          width: this.props.dims.width - 240
        }}>

        <ToRender />

      </div>
    );
  }

});

module.exports = Content;
