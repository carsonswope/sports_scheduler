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
      leagueId: leagueId,
      team_1_id: null,
      team_2_id: null,
      date: DateHelper.todayInputString(),
      time: '12:00',
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

  },



  changeLeague: function(e){
    this.setState({ leagueId: parseInt(e.target.value) });
  },

  changeTeam: function(team, e){
    e.preventDefault();
    if (team === 'HOME'){
      this.setState({team_1_id: parseInt(e.target.value)});
    } else {
      this.setState({team_2_id: parseInt(e.target.value)});
    }
  },

  changeDate: function(e){
    this.setState({ date: e.target.value })
  },

  changeTime: function(e){
    this.setState({ time: e.target.value })
  },

  changeField: function(e){
    this.setState({ fieldId: e.target.value })
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

    if (this.state.leagueId){
      teamIds = LeagueTeamStore.teams(this.state.leagueId)
      var teamToSkip = teamSlot === 'HOME' ?
        this.state.team_2_id : this.state.team_1_id
      teamIds = teamIds.filter(function(teamId){
        return teamId !== teamToSkip;});

      return teamIds.map(function(teamId){
        return TeamStore.find(teamId);});

    } else {

      return [];
    }

  },

  fieldOptions: function(){

    if (this.state.leagueId){

      facilityIds = LeagueFacilityStore.facilities(this.state.leagueId)

      return facilityIds.map(function(facilityId){
        return FacilityStore.find(facilityId);
      });

    } else {
      return [];
    }

  },

  dateField: function(){
      return [

        <div className='info-stat-text' key={1}
          style={{width: 50}}>
          {DateConstants.DAYS_OF_WEEK[
            DateHelper.dateObjectFromInputString(
              this.state.date).getDay()]}
        </div>,

        <input type='date' key={2}
          className='gamedate-input-form'
          value={this.state.date}
          style={{width: 150}}
          onChange={this.changeDate} />

      ]
  },

  timeField: function(){
    return(
      <input type='time'
        className='gamedate-input-form'
        value={this.state.time}
        onChange={this.changeTime} />
    )
  },

  entries: function(){
    return[{
      title: 'league:',
      inputField: this.selectField(
        LeagueStore.all(),
        this.state.leagueId,
        this.changeLeague
    )},{
      title: 'home team:',
      inputField: this.selectField(
        this.teamOptions('HOME'),
        this.state.team_1_id,
        this.changeTeam.bind(this, 'HOME')
    )},{
      title: 'away team:',
      inputField: this.selectField(
        this.teamOptions('AWAY'),
        this.state.team_2_id,
        this.changeTeam.bind(this, 'AWAY')
    )},{
      title: 'field:',
      inputField: this.selectField(
        this.fieldOptions(),
        this.state.fieldId,
        this.changeField
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

  render: function() {

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
            onClick={this.props.cancelAdding}
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

});

module.exports = NewGamesForm;
