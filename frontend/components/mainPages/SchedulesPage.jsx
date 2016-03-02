var React = require('react');
var PropTypes = React.PropTypes;
var ScheduleCriteria = require('../showPages/ScheduleCriteria');
var EventStore = require('../../stores/EventStore');
var NavStore = require('../../stores/NavStore');

var EventsListView = require('./EventsListView');
var ListViewEventShow = require('../showPages/ListViewEventShow');
var CalendarViewEventShow = require('../showPages/CalendarViewEventShow');

var NavActions = require('../../actions/NavActions');

var NewGameForm = require('../newPages/NewGameForm');

var SchedulesPage = React.createClass({

  getInitialState: function(){

    var filter = NavStore.options('SCHEDULES').filter;

    return({
      viewType: NavStore.options('SCHEDULES').subTab,
      filter: filter,
      games: EventStore.filteredEvents(filter),
      selected: null,
      adding: NavStore.options('SCHEDULES').adding,
    });
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
    this.eventListener = EventStore.addListener(this.eventChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
    this.eventListener.remove();
  },

  navChange: function(){

    var options = NavStore.options('SCHEDULES');
    var filter = options.filter;

    this.setState({
      viewType: options.subTab,
      filter: filter,
      games: EventStore.filteredEvents(filter),
      adding: options.adding
    });
  },

  eventChange: function(){

    this.setState({
      games: EventStore.filteredEvents(this.state.filter),
      focused: null
    });

  },

  toggleFocus: function(id){
    if (this.state.focused === id) {
      this.setState({focused: null});
    } else {
      this.setState({focused: id});
    }
  },

  gamesList: function(){

    var height = this.props.dims.height

    if (NavStore.options('SCHEDULES').adding) {
      height -= 140;
    } else {
      height -= 40;
    }

    if (this.state.viewType === 'LIST_VIEW'){

      return <EventsListView games={this.state.games} dims={{width: 800, height: height}}/>
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div className='schedule-header-main'>

        <NewGameForm />

        <ScheduleCriteria />

        <div style={{
            width: this.props.dims.width,
            height: this.props.dims.height,
            overflowX: 'hidden'
          }}>

          {this.gamesList()}

        </div>
      </div>
    );
  }

});

module.exports = SchedulesPage;
