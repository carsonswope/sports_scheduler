var React = require('react');
var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var NewButton = require('../misc/NewButton');
var SchedulesOptions = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      adding: NavStore.options('SCHEDULES').adding
    };
  },

  componentDidMount: function() {
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function() {
    this.navListener.remove();
  },

  navChange: function(){


    this.setState({
      adding: NavStore.options('SCHEDULES').adding
    })
  },


  render: function() {

    var selectedTab = NavStore.options('SCHEDULES').subTab;

    var newButton;


    if (this.state.adding) {
      newButton =(
        <NewButton
          tab={'SCHEDULES'}
          name={'cancel adding'}
          cancelButton={true}
          setTabOption={{ category:
            'adding',
            value: false
          }} />
      )
    } else {
      newButton =(
        <NewButton
          tab={'SCHEDULES'}
          name={'Add a game'}
          selected={false} />
      );
    }

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
        {newButton}
      </div>
    );
  }

});

module.exports = SchedulesOptions;
