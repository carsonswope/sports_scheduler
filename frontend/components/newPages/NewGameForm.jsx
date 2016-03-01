var React = require('react');
var PropTypes = React.PropTypes;

var EventActions = require('../../actions/EventActions');


var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var LeagueStore = require('../../stores/LeagueStore');
var TeamStore = require('../../stores/TeamStore');
var FacilityStore = require('../../stores/FacilityStore');
var LeagueTeamStore = require('../../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../../stores/LeagueFacilityStore');
var DateConstants = require('../../constants/DateConstants');
var DateHelper = require('../../util/DateHelper');

var NewGamesForm = React.createClass({

  getInitialState: function(){

    var leagueId = NavStore.options('SCHEDULES').filterType === 'BY_LEAGUE' ?
      NavStore.options('SCHEDULES').filterSpec : null

    return({
      adding:   NavStore.options('SCHEDULES').adding,
      newGame:  NavStore.options('SCHEDULES').newGame
    })

    return({
      leagueId: leagueId,
      team_1_id: null,
      team_2_id: null,
      date: DateHelper.todayInputString(),
      startTime: '12:00',
      fieldId: null
    });

  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  navChange: function(){
    this.setState({
      adding:   NavStore.options('SCHEDULES').adding,
      newGame:  NavStore.options('SCHEDULES').newGame
    })
  },

  changeOption: function(category, e){

    e.preventDefault();

    var newGameOptions = this.state.newGame;
    newGameOptions[category] = e.target.value;

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
        className='gamedate-input-form'
        value={value}
        style={{width: 120}}
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

        <div className='info-stat-text' key={1}
          style={{width: 50}}>
          {this.dayOfWeekOfNewGameDate()}
        </div>,

        <input type='date' key={2}
          className='gamedate-input-form'
          value={this.state.newGame.date}
          style={{width: 150}}
          onChange={this.changeOption.bind(this, 'date')} />

      ]
  },

  timeField: function(){
    return(
      <input type='time'
        className='gamedate-input-form'
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
      title: 'home team:',
      inputField: this.selectField(
        this.teamOptions('HOME'),
        this.state.newGame.team_1_id,
        this.changeOption.bind(this, 'team_1_id')
    )},{
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
    )},{
      title: 'date:',
      inputField: this.dateField(),
      style: {width: 78}
    },{
      title: 'time:',
      inputField: this.timeField(),
      style: {width: 145}
    },];
  },

  scheduleGame: function(){
    var event = {
      date: DateHelper.dbDateFromInputString(this.state.date),
      facility_id: this.state.fieldId,
      league_id: this.state.leagueId,
      team_1_id: this.state.team_1_id,
      team_2_id: this.state.team_2_id,
      start_time: DateHelper.timeInputStringToNumber(this.state.time),
      duration: LeagueStore.find(this.state.leagueId).gameDuration
    }

    EventActions.attemptCreate(event);

    this.props.cancelAdding();

  },

  startAdding: function(){
    NavActions.setTabOption('SCHEDULES', 'adding', true);
  },

  stopAdding: function(){
    NavActions.setTabOption('SCHEDULES', 'adding', false);
  },

  render: function() {

    if (!this.state.adding) {

      return null;

    } else {

      return(
        <div className='new-game-form-main'>
          <div className='new-game-form-header'>
            <div className='schedule-criteria-title'>
              Schedule a new game:
            </div>
          </div>
        </div>


      )

      var fields = this.entries().map(function(entry, i){

        var textStyle = entry.style || {width: 108};

        return(
          <div className='info-stat' key={i}
            style={{width: 300, left: 103}}>
            <div className='info-stat-label'
              style={textStyle}>
              {entry.title}
            </div>
            {entry.inputField}
          </div>
        );

      });

      return (
        <div>
          <div className='info-stat' key={-2}
            style={{width: 'calc(100% - 124px)', height: 42, left: 103, borderBottom: '2px solid #16174f'}}>
            <div className='gamedate-input-button gamedate-input-submit-button'
              style={{fontWeight: 700, bottom: -22}}>
              schedule a game!
            </div>
          </div>

          {fields}

          <div className='info-stat' key={-3}
            style={{width: '300', left: 103}}>
            <div className='gamedate-input-button'
              onClick={this.stopAdding}
              style={{color: '#963019', left: 21, width: 185}}>
              cancel
            </div>
            <div className='gamedate-input-button'
              onClick={this.scheduleGame}>
              schedule!
            </div>
          </div>

        </div>
      );
    }
  }

});

module.exports = NewGamesForm;