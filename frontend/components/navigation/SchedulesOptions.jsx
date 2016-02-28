var React = require('react');
var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var NewButton = require('../misc/NewButton');
var SchedulesOptions = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      nameSearch: 'hi'
    };
  },

  render: function() {

    var selectedTab = NavStore.options('SCHEDULES').subTab;

    return (
      <div className="navbar-expanded"
        style={{height: NavConstants.OPTIONS_HEIGHT}}>
        <NewButton
          tab={'SCHEDULES'}
          name={'List View'}
          subTab={'LIST_VIEW'}
          selected={selectedTab === 'LIST_VIEW'}/>
        <NewButton
          tab={'SCHEDULES'}
          name={'Calendar View'}
          subTab={'CALENDAR_VIEW'}
          selected={selectedTab === 'CALENDAR_VIEW'} />
      </div>
    );
  }

});

module.exports = SchedulesOptions;
