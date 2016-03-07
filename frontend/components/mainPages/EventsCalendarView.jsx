var React = require('react');
var PropTypes = React.PropTypes;

var NavStore = require('../../stores/NavStore');
var AvailabilityStore = require('../../stores/AvailabilityStore');
var LeagueStore = require('../../stores/LeagueStore');
var FacilityStore = require('../../stores/FacilityStore');
var DateHelper = require('../../util/DateHelper');

var ListViewEventShow = require('../showPages/ListViewEventShow');
var EventStore = require('../../stores/EventStore');

var SingleDayView = require('./SingleDayView');

var AvailabilityActions = require('../../actions/AvailabilityActions');

var EventsCalendarView = React.createClass({

  getInitialState: function() {

    //this.props.filter
    //this.props.games

    return {
      startTime: '15:00',
      endTime: '23:00',
      overlay: {
        dates: []
      },
      fields: FacilityStore.all(),
      focusedEvent: {
        id: null,
        focusType: 'NONE'
        //type is either 'HOVER' or 'FOCUS'
      }
    }

  },

  componentDidMount: function() {

    this.availabilityListener = AvailabilityStore.addListener(this.availabilityChange);
    this.navListener = NavStore.addListener(this.navChange);
    this.eventListener = EventStore.addListener(this.eventChange);

    if (this.leagueSelectedForOverlay()){

      var slots = AvailabilityStore.findTimeSlots(
        'League',
        this.props.filter.filterSpec
      );

      if (slots){
        this.setStateWithNewOverlay(slots);
      } else {
        this.fetchAvailableDatesForOverlay();
      }

    }

  },

  componentWillUnmount: function(){
    this.availabilityListener.remove();
    this.navListener.remove();
    this.eventListener.remove();
  },

  componentWillReceiveProps: function(newProps){

    if (this.leagueSelectedForOverlay(newProps)){

      var slots = AvailabilityStore.findTimeSlots(
        'League',
        newProps.filter.filterSpec
      );

      if (slots){
        this.setStateWithNewOverlay(slots);
      } else {
        this.fetchAvailableDatesForOverlay(newProps);
      }

    } else {

      this.setStateWithNewOverlay([]);

    }
  },

  leagueSelectedForOverlay: function(newProps){
    var props = newProps || this.props;

    return (props.filter.filterType === 'BY_LEAGUE' &&
            props.filter.filterSpec &&
            parseInt(props.filter.filterSpec) > -1)


  },

  setStateWithNewOverlay: function(slots) {

    this.setState({
      overlay: {
        dates: slots
      }
    });
  },

  fetchAvailableDatesForOverlay: function(newProps){
    var props = newProps || this.props;

    AvailabilityActions.fetchAvailableDates(
      props.filter.filterSpec,
      'League'
    );

  },

  availabilityChange: function(){

    if (this.leagueSelectedForOverlay()){

      var slots = AvailabilityStore.findTimeSlots(
        'League', this.props.filter.filterSpec
      );

      if (slots){
        this.setStateWithNewOverlay(slots);

      } else {

        this.fetchAvailableDatesForOverlay();
      }
    }
  },

  navChange: function(){

  },

  changeStartTime: function(e){
    e.preventDefault();
    this.setState({
      startTime: e.target.value
    });
  },

  changeEndTime: function(e){
    e.preventDefault();
    this.setState({
      endTime: e.target.value
    });
  },

  startHover: function(eventId){
    if (this.state.focusedEvent.focusType !== 'FOCUS') {

      this.setState({
        focusedEvent: {
          focusType: 'HOVER',
          id: eventId
        }
      });

    }
  },

  stopHover: function(eventId){
    if (this.state.focusedEvent.focusType !== 'FOCUS') {

      this.setState({
        focusedEvent: {
          focusType: 'NONE',
          id: null
        }
      });

    }
  },

  removeFocus: function(eventId){
    this.setState({
      focusType: 'NONE',
      id: null
    });

  },

  toggleFocus: function(eventId){
    if (this.state.focusedEvent.focusType !== 'FOCUS') {

      this.setState({
        focusedEvent: {
          focusType: 'FOCUS',
          id: eventId
        }
      });

    } else {

      if (this.state.focusedEvent.id === eventId) {

        this.setState({
          focusedEvent: {
            focusType: 'HOVER',
            id: eventId
          }
        });

      } else {

        this.setState({
          focusedEvent: {
            focusType: 'FOCUS',
            id: eventId
          }
        });

      }
    }
  },

  columns: function(){
    return[{
      title: 'Day',
      varName: 'dayOfWeek',
      width: 50
    },{
      title: 'Date',
      varName: 'date',
      width: 100
    },{
      title: 'Time',
      varName: 'startTime',
      width: 95
    },{
      title: 'Field',
      varName: 'facilityId',
      width: 50
    },{
      title: 'League',
      varName: 'leagueId',
      width: 75
    },{
      title: 'Home Team',
      varName: 'team_1_id',
      width: 150
    },{
      title: 'Away Team',
      varName: 'team_2_id',
      width: 150
    }];
  },

  eventChange: function(){

    var event = EventStore.find(this.state.focusedEvent.id);

    if (!event) {

      this.setState({
        focusedEvent: {
          focusType: 'NONE',
          id: null}
        }
      )
    }

  },

  focusedElement: function(){

    if (this.state.focusedEvent.focusType !== 'NONE') {

      var event = EventStore.find(this.state.focusedEvent.id);

      if (event) {
        // if (!event) {
        //
        //   this.setState({
        //     focusedEvent: {
        //       focusType: 'NONE',
        //       id: null}
        //     });
        //   return null;
        // }

        var classes = {
          header: this.state.focusType === 'FOCUS' ?
            'table-entry-header-focused' : 'table-entry-header',
          text: 'table-entry-text'
        };

        return(
          <ListViewEventShow event={event}
            classInfo={classes}
            width={750}
            toggleFocus={this.toggleFocus}
            removeFocus={this.removeFocus}
            focused={this.state.focusedEvent.focusType === 'FOCUS'}
            columns={this.columns()} />

        );
      }

    }

  },

  render: function() {

    var allDates = {};

    this.props.games.forEach(function(game){

      if (!allDates[game.date]){
        allDates[game.date] = {
          overlays: [],
          events: []
        };
      };

      allDates[game.date].events.push(game);

    }, this);

    this.state.overlay.dates.forEach(function(overlay){

      var date = DateHelper.dbDateFromInputString(overlay.date);

      if (!allDates[date]){
        allDates[date] = {
          overlays: [],
          events: []
        };
      };

      allDates[date].overlays.push(overlay);

    }, this);

    var datesList = Object.keys(allDates).sort(DateHelper.dateStringSpaceship);

    var dates = datesList.map(function(date, i){

      return(
        <SingleDayView key={i}
          date={date}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          games={allDates[date].events}
          fields={this.state.fields}
          startHover={this.startHover}
          stopHover={this.stopHover}
          focusedEvent={this.state.focusedEvent}
          toggleFocus={this.toggleFocus}
          overlay={allDates[date].overlays[0]}
          overlays={allDates[date].overlays} />
      );

    }, this);

    return (
      <div className='calendar-view-main'
        style={{
          width: 'calc(100% - 55px)',
          height: this.props.dims.height - 20
        }}>

        <div className='calendar-view-time-selector-main'>
          <div className='calendar-view-time-selector-start-time-line' />
          <div className='calendar-view-time-selector-end-time-line' />
          <input type='time'
            value={this.state.startTime}
            onChange={this.changeStartTime}
            className='calendar-view-time-selector-start-time' />
          <input type='time'
            value={this.state.endTime}
            onChange={this.changeEndTime}
            className='calendar-view-time-selector-end-time' />
        </div>

        <div className='calendar-view-calendar-main'>

          {dates}

        </div>

        <div>

          {this.focusedElement()}
        </div>
      </div>
    );
  }

});

module.exports = EventsCalendarView;
