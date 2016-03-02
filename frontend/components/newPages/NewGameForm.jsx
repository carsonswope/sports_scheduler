var React = require('react');
var PropTypes = React.PropTypes;

var EventActions = require('../../actions/EventActions');

var EventStore = require('../../stores/EventStore');

var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var LeagueStore = require('../../stores/LeagueStore');
var TeamStore = require('../../stores/TeamStore');
var FacilityStore = require('../../stores/FacilityStore');
var LeagueTeamStore = require('../../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../../stores/LeagueFacilityStore');
var DateConstants = require('../../constants/DateConstants');
var DateHelper = require('../../util/DateHelper');
var AvailabilityHelper = require('../../util/AvailabilityHelper');

var NewGamesForm = React.createClass({

  getInitialState: function(){

    var adding = NavStore.options('SCHEDULES').adding;
    var newGame = NavStore.options('SCHEDULES').newGame;
    // var newGameErrors = {
    //   incompleteInput: null,
    //   conflicts: null
    // };
    //
    // if (adding) { newGameErrors = this.newGameErrors(newGame); }

    return({
      adding:   adding,
      newGame:  newGame
      // newGameErrors: newGameErrors
    });
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  navChange: function(){

    var adding = NavStore.options('SCHEDULES').adding;
    var newGame = NavStore.options('SCHEDULES').newGame;

    // debugger;
    // var newGameErrors = {
    //   incompleteInput: null,
    //   conflicts: null
    // };

    debugger;

    // if (adding) { newGameErrors = this.newGameErrors(newGame); }

    this.setState({
      adding:   adding,
      newGame:  newGame
      // newGameErrors: newGameErrors
    });
  },

  changeOption: function(category, e){

    e.preventDefault();

    var newGameOptions = this.state.newGame;
    newGameOptions[category] = e.target.value;

    if (category === 'leagueId') {
      newGameOptions['team_1_id'] = null;
      newGameOptions['team_2_id'] = null;
    }

    var errors = this.newGameErrors(newGameOptions);

    newGameOptions.errors = errors;

    NavActions.setTabOption(
      'SCHEDULES', 'newGame', newGameOptions
    );

  },

  selectField: function(choices, value, changeCallback){

    var choiceElements = choices.map(function(choice, i){
      return(
        <option key={i} value={choice.id}> {choice.name} </option>
      );
    });

    if (choiceElements.length){
      choiceElements.unshift(
        <option key={-1} value={null}></option>
      );
    }

    return(
      <select
        className='new-game-form-input'
        value={value}
        style={{width: 'calc(100% - 140px)'}}
        onChange={changeCallback}>
        {choiceElements}
      </select>
    );

  },

  teamOptions: function(teamSlot){

    if (this.state.newGame.leagueId){
      leagueId = parseInt(this.state.newGame.leagueId)
      teamIds = LeagueTeamStore.teams(leagueId)
      var teamToSkip = teamSlot === 'HOME' ?
        parseInt(this.state.newGame.team_2_id) :
        parseInt(this.state.newGame.team_1_id)
      teamIds = teamIds.filter(function(teamId){
        return teamId !== teamToSkip;});

      return teamIds.map(function(teamId){
        return TeamStore.find(teamId);});

    } else {
      return [];
    }

  },

  fieldOptions: function(){

    if (this.state.newGame.leagueId){
      leagueId = parseInt(this.state.newGame.leagueId)
      facilityIds = LeagueFacilityStore.facilities(leagueId)

      return facilityIds.map(function(facilityId){
        return FacilityStore.find(facilityId);
      });

    } else {
      return [];
    }

  },

  dayOfWeekOfNewGameDate(){
    if (this.state.newGame.date){
      return DateConstants.DAYS_OF_WEEK[
        DateHelper.dateObjectFromInputString(
        this.state.newGame.date).getDay()];
    }
  },

  dateField: function(){

      return [

        <input type='date' key={2}
          className='new-game-form-input'
          value={this.state.newGame.date}
          style={{width: 'calc(100%-140px)'}}
          onChange={this.changeOption.bind(this, 'date')} />,

        <div className='info-stat-text' key={1}
          style={{width: 30, float: 'right'}}>
          {this.dayOfWeekOfNewGameDate()}
        </div>

      ]
  },

  timeField: function(){
    return(
      <input type='time'
        className='new-game-form-input'
        value={this.state.newGame.time}
        onChange={this.changeOption.bind(this, 'startTime')} />
    )
  },

  entries: function(){
    return[{
      title: 'league:',
      inputField: this.selectField(
        LeagueStore.all(),
        this.state.newGame.leagueId,
        this.changeOption.bind(this, 'leagueId')
    )},{
      title: 'date:',
      inputField: this.dateField()
    },{
      title: 'home team:',
      inputField: this.selectField(
        this.teamOptions('HOME'),
        this.state.newGame.team_1_id,
        this.changeOption.bind(this, 'team_1_id')
    )},{
      title: 'time:',
      inputField: this.timeField()
    },{
      title: 'away team:',
      inputField: this.selectField(
        this.teamOptions('AWAY'),
        this.state.newGame.team_2_id,
        this.changeOption.bind(this, 'team_2_id')
    )},{
      title: 'field:',
      inputField: this.selectField(
        this.fieldOptions(),
        this.state.newGame.fieldId,
        this.changeOption.bind(this, 'fieldId')
    )}];
  },

  scheduleGame: function(){

    var event = {
      date: DateHelper.dbDateFromInputString(this.state.newGame.date),
      facility_id: this.state.newGame.fieldId,
      league_id: this.state.newGame.leagueId,
      team_1_id: this.state.newGame.team_1_id,
      team_2_id: this.state.newGame.team_2_id,
      start_time: DateHelper.timeInputStringToNumber(this.state.newGame.startTime),
      duration: LeagueStore.find(this.state.newGame.leagueId).gameDuration
    }

    EventActions.attemptCreate(event);

    this.resetForm();

  },

  resetForm: function(){

    var newGame = this.state.newGame;

    newGame['team_1_id'] = -1;
    newGame['team_2_id'] = -1;
    // newGame['date'] = null;
    // newGame['startTime'] = null;
    newGame['fieldId'] = -1;
    newGame['errors'] = {
      incompleteInput: ['select teams!'],
      conficts: []
    };

    this.setState({
      newGame: newGame
    });

    NavActions.setTabOptions([{
      tab: 'SCHEDULES',
      category: 'newGame',
      newValue: newGame
    }]);

  },

  startAdding: function(){
    NavActions.setTabOption('SCHEDULES', 'adding', true);
  },

  stopAdding: function(){

    var newGame = this.state.newGame;

    newGame['team_1_id'] = null;
    newGame['team_2_id'] = null;
    // newGame['date'] = null;
    // newGame['startTime'] = null;
    newGame['fieldId'] = null;
    newGame['errors'] = {
      incompleteInput: ['select teams!'],
      conficts: []
    };

    this.setState({
      newGame: newGame
    });

    NavActions.setTabOptions([{
      tab: 'SCHEDULES',
      category: 'newGame',
      newValue: newGame
    },{
      tab: 'SCHEDULES',
      category: 'adding',
      newValue: false
    }]);
    // NavActions.setTabOption('SCHEDULES', 'newGame', newGame);
    // NavActions.setTabOption('SCHEDULES', 'adding', false);
  },

  newGameErrors(newGame){

    var errors = [];
    var conflictingEventsList = [];

    debugger;

    //check if form completed
    if (!newGame.leagueId){
      errors.push('select a league!');

    } else if (!newGame.team_1_id
            || !newGame.team_2_id){
      errors.push('select teams!');

    } else if (!newGame.fieldId){
      errors.push('select a facility!');

    } else if (!newGame.date){
      errors.push('select a date!');

    } else if (!newGame.startTime){
      errors.push('select a time!');

    //if not completed, then check if the proposed game date/time
    //is conflicting with anything
    } else {

      var team1 = TeamStore.find(newGame.team_1_id);
      var team2 = TeamStore.find(newGame.team_2_id);
      var facility = FacilityStore.find(newGame.fieldId);
      var league = LeagueStore.find(newGame.leagueId);

      var eventInfo = {
        eventDate: DateHelper.dbDateFromInputString(newGame.date),
        eventStartTime: DateHelper.timeInputStringToNumber(newGame.startTime),
        eventDuration: league.gameDuration
      };


      var team_1_events = EventStore.filteredEvents({
        filterType: 'BY_TEAM', filterSpec: team1.id
      });
      var team_2_events = EventStore.filteredEvents({
        filterType: 'BY_TEAM', filterSpec: team2.id
      });
      var facilityEvents = EventStore.filteredEvents({
        filterType: 'BY_FACILITY', filterSpec: facility.id
      });


      var conflicts = {
        team1: AvailabilityHelper.conflicts(team_1_events, eventInfo),
        team2: AvailabilityHelper.conflicts(team_2_events, eventInfo),
        facility: AvailabilityHelper.conflicts(facilityEvents, eventInfo)
      }

      if (conflicts.team1.length & conflicts.team2.length) {
        errors.push(team1.name + ' and ' + team2.name + ' already are scheduled at that time');
      } else if (conflicts.team1.length){
        errors.push(team1.name + ' already are scheduled at that time');
      } else if (conflicts.team2.length){
        errors.push(team2.name + ' already are scheduled at that time');
      }

      if (conflicts.facility.length){
        errors.push(facility.name + ' is already booked at that time');
      }

      var conflictingEventsList =
        conflicts.team1.concat(conflicts.team2).
        concat(conflicts.facility).map(function(conflictingEvent){
          return conflictingEvent.id;
        });
    }

    return {
      incompleteInput: errors,
      conflicts: conflictingEventsList
    };
  },

  scheduleButton: function(){

    if (this.state.newGame.errors.incompleteInput.length) {
      return (
        <div className='new-game-form-error-message'>
          {this.state.newGame.errors.incompleteInput[0]}
        </div>
      );

    } else {

      return (
        <div className='new-game-form-input-line new-game-button'
          onClick={this.scheduleGame}>
          schedule!
        </div>
      );

    }

  },

  render: function() {

    if (!this.state.adding) {

      return null;

    } else {

      var fields = this.entries().map(function(entry, i){
        return(
          <div className='new-game-form-input-line' key={i}>
            <div className='new-game-form-label'>
              {entry.title}
            </div>
            {entry.inputField}
          </div>
        );

      });

      return(
        <div className='new-game-form-main'>
          <div className='new-game-form-header'>
            <div className='schedule-criteria-title'
              style={{left: 0}}>
              Schedule a new game:
            </div>
          </div>

          {fields}

          <div className='new-game-form-input-line'>
            <div className='new-game-form-label new-game-button'
              onClick={this.stopAdding}
              style={{color: '#963019'}}>
              cancel
            </div>

            {this.scheduleButton()}

          </div>

        </div>


      );
    }

  }

});

module.exports = NewGamesForm;
