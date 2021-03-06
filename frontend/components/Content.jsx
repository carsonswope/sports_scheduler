var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../stores/NavStore');

var FacilityActions = require('../actions/FacilityActions');
var EventActions = require('../actions/EventActions');
var LeagueActions = require('../actions/LeagueActions');
var TeamActions = require('../actions/TeamActions');

var NavConstants = require('../constants/NavConstants');

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

  componentWillUnmount: function() {
    this.navListener.remove();
  },

  navChange: function() {
    this.setState({ tab: NavStore.currentTab() });
  },

  render: function() {

    var ToRender = NavConstants.MAIN_PAGES[this.state.tab]
    ToRender = <ToRender resourceType={this.state.tab}
      takeTour={this.props.takeTour}
      tourNumber={this.props.tourNumber}
      dims={{
        height: this.props.dims.height - 199,
        width: this.props.dims.width - 225
      }}/>

    var style={
      height: this.props.dims.height - 114,
      width: this.props.dims.width - 245,
      overflowX: 'hidden'
    }

    if (this.state.tab === 'SCHEDULES') {
      style['overflowY'] = 'hidden';
    }

    return (

      <div className="content-body"
        style={style}>

        {ToRender}

      </div>
    );
  }

});

module.exports = Content;
