var React = require('react');
var PropTypes = React.PropTypes;

var NavStore = require('../../stores/NavStore');
var AvailabilityStore = require('../../stores/AvailabilityStore');
var LeagueStore = require('../../stores/LeagueStore');
var FacilityStore = require('../../stores/FacilityStore');

var SingleDayView = require('./SingleDayView');

var AvailabilityActions = require('../../actions/AvailabilityActions');

var EventsCalendarView = React.createClass({

  getInitialState: function() {

    //this.props.filter
    //this.props.games

    return {
      startTime: '10:00',
      endTime: '20:00',
      overlay: {
        name: '',
        dates: []
      },
      fields: FacilityStore.all()
    }

  },

  componentDidMount: function() {

    this.availabilityListener = AvailabilityStore.addListener(this.availabilityChange);

    if (this.props.filter.filterType === 'BY_LEAGUE' &&
        this.props.filter.filterSpec && this.props.filter.filterSpec > -1){

      var slots = AvailabilityStore.findTimeSlots('League', this.props.filter.filterSpec);

      if (slots){

        var overlay = {
          name: LeagueStore.find(this.props.filter.filterSpec),
          dates: slots
        };

        this.setState({overlay: overlay})

      } else {

        AvailabilityActions.fetchAvailableDates(
          this.props.filter.filterSpec,
          'League'
        );

      }

    }

  },

  componentWillUnmount: function(){
    this.availabilityListener.remove();
  },

  componentWillReceiveProps: function(newProps){

    if (newProps.filter.filterType === 'BY_LEAGUE' &&
        newProps.filter.filterSpec && parseInt(this.props.filter.filterSpec) > -1){

      var slots = AvailabilityStore.findTimeSlots('League', this.props.filter.filterSpec);

      if (slots){

        var overlay = {
          name: LeagueStore.find(this.props.filter.filterSpec),
          dates: slots
        };

        this.setState({overlay: overlay})
      } else {

        AvailabilityActions.fetchAvailableDates(
          newProps.filter.filterSpec,
          'League'
        );

      }

    }

  },

  availabilityChange: function(){

    if (this.props.filter.filterType === 'BY_LEAGUE' &&
        this.props.filter.filterSpec  && parseInt(this.props.filter.filterSpec) > -1){

      var slots = AvailabilityStore.findTimeSlots('League', this.props.filter.filterSpec);

      if (slots){

        var overlay = {
          name: LeagueStore.find(this.props.filter.filterSpec).name,
          dates: slots
        };

        this.setState({overlay: overlay})

      } else {

        AvailabilityActions.fetchAvailableDates(
          this.props.filter.filterSpec,
          'League'
        );

      }
    }

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

  render: function() {

    var overlayList = this.state.overlay.dates.map(function(date, i){
      return(
        <div key={i}>
          {date.date}
          {date.startTime}
          {date.endTime}
        </div>
      );
    });

    var gamesList = this.props.games.map(function(game, i){
      return(
        <div key={-1 - i}>
          game
        </div>
      );
    })

    var allDates = this.state.overlay.dates.map(function(date){
      return date.date;
    });

    var dates = this.state.overlay.dates.map(function(date,i){

      return(
        <SingleDayView key={i}
          date={date.date}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          games={null}
          fields={this.state.fields}
          overlay={date} />
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
      </div>
    );
  }

});

module.exports = EventsCalendarView;
