var React = require('react');
var PropTypes = React.PropTypes;
var DateHelper = require('../../util/DateHelper');
var DateConstants = require('../../constants/DateConstants');

var EventActions = require('../../actions/EventActions');
var EventStore = require('../../stores/EventStore');

var LeagueStore = require('../../stores/LeagueStore');
var LeagueFacilityStore = require('../../stores/LeagueFacilityStore');
var FacilityStore = require('../../stores/FacilityStore');
var TeamStore = require('../../stores/TeamStore');
var EventHelper = require('../../util/EventHelper');

var ListViewEventShow = React.createClass({

  getInitialState: function(){

    var newGameDate;
    var newGameTime;
    var newFacility;

    if (EventHelper.isScheduled(this.props.event)){
      newGameDate = DateHelper.JSdateToInputString(this.props.event.date);
      newGameTime = DateHelper.timeStringPrimitiveToInputString(this.props.event.startTime);
      newFacility = this.props.event.facilityId;
    }

    var newGame = this.newGameObject();
    newGame.fieldId = newFacility;
    newGame.date = newGameDate;
    newGame.startTime = newGameTime;

    var errors = EventStore.newGameErrors(newGame);

    return({
      status: null,
      newGameDate: newGameDate,
      newGameTime: newGameTime,
      newFacility: newFacility,
      errors: errors
    });
  },

  callToggle: function(){
    this.props.toggleFocus(this.props.event.id);
  },

  detail: function(){
    if (this.props.focused){
      return(
        <div className='inline-reschedule-main'
          style={{width: this.props.width}}>
        {this.detailOptions()}
        </div>
      );
    }
  },

  componentWillReceiveProps: function(newProps){

    if (!newProps.focused) {
      var newGameDate;
      var newGameTime;
      var newFacility;

      if (EventHelper.isScheduled(this.props.event)){
        newGameDate = DateHelper.JSdateToInputString(this.props.event.date);
        newGameTime = DateHelper.timeStringPrimitiveToInputString(this.props.event.startTime);
        newFacility = this.props.event.facilityId;
      }

      var newGame = this.newGameObject();
      newGame.fieldId = newFacility;
      newGame.date = newGameDate;
      newGame.startTime = newGameTime;

      var errors = EventStore.newGameErrors(newGame);

      this.setState({
        status: null,
        newGameDate: newGameDate,
        newGameTime: newGameTime,
        newFacility: newFacility,
        errors: errors
      });
    }

  },

  detailOptions: function(){

    return([
      <div className='inline-reschedule-inner-half' key={1}>
        {this.state.status ? this.rescheduleForm() : this.detailChoiceList()}
      </div>,
      <div className='inline-reschedule-inner-half' key={2}>
      </div>]
    );

  },

  detailChoiceList: function(){

    var choices = [{
      action: this.startRescheduleGame,
      text: 'reschedule game',
      color: '#667467'
    },{
      action: this.unscheduleGame,
      text: 'unschedule game',
      color: '#963019'
    },{
      action: this.deleteGame,
      text: 'delete game',
      color: '#963019'
    }];

    return choices.map(function(choice, i){
      return(
        <div className='inline-reschedule-line' key={i}>
          <div className='navbar-options-element-text'
            style={{color: choice.color}}
            onClick={choice.action}>
            {choice.text}
          </div>
        </div>
      );

    }, this);
  },

  rescheduleForm: function() {

    var choices = [{
      labelText: 'new date:',
      inputForm: ([
        <div className='info-stat-text' key={1}
          style={{width: 47}}>{this.newDateDayOfWeek()}</div>,
        <input type='date' className='gamedate-input-form' key={2}
          style={{width: 150}}
          value={this.state.newGameDate}
          onChange={this.changeOption.bind(this, 'newGameDate')} />]
      )
    },{
      labelText: 'new time:',
      inputForm: (
        <input type='time'
          className='gamedate-input-form'
          value={this.state.newGameTime}
          onChange={this.changeOption.bind(this, 'newGameTime')} />
      )
    },{
      labelText: 'new facility:',
      inputForm: (
        <select key={4}
          className='gamedate-input-form'
          style={{}}
          value={EventHelper.isScheduled(this.props.event) ?
            this.state.newFacility : null}
          onChange={this.changeOption.bind(this, 'newFacility')}>
          {this.facilityChoices()}
        </select>
      )
    }];

    var choiceElements = choices.map(function(choice, i){
      return(
        <div className='inline-reschedule-line' key={i}>
          <div className='info-stat-label'
            style={{width: 119}}>
            {choice.labelText}
          </div>
          {choice.inputForm}
        </div>
      );
    }, this);

    choiceElements.push(
      <div className='inline-reschedule-line' key={-1}
        style={{borderBottom: 0}}>
        <div className='gamedate-input-button'
          style={{color: '#963019', width: 130, left: 20}}
          onClick={this.resetAndHideRescheduleMenu}>
          cancel
        </div>

        {this.submitButton()}

      </div>
    )

    return choiceElements;

  },

  submitButton: function(){

    var buttonOrMessage;

    if (this.state.errors.incompleteInput.length) {
      buttonOrMessage=(
        <div className='inline-reschedule-label'
          style={{display: 'inline-block', color: '#963019', width: 100, whiteSpace: 'nowrap'}}>
          {this.state.errors.incompleteInput[0]}
        </div>
      );

    } else {
      buttonOrMessage=(
        <div className='gamedate-input-button'
          onClick={this.submitReschedule}>
          submit reschedule!
        </div>
      );

    }

    return buttonOrMessage;
  },

  startRescheduleGame: function() {
    this.setState({ status: 'RESCHEDULE' });
  },

  unscheduleGame: function() {

    this.resetOptionsAfterUnschedule();

    this.props.removeFocus();

    EventActions.attemptReschedule({
      id: this.props.event.id,
      facility_id: null,
      start_time: null,
      date: null
    });
  },

  deleteGame: function() {
    EventActions.attemptDestroy(this.props.event.id);
  },

  facilityChoices: function(){

    var facilityIds = LeagueFacilityStore.facilities(
      this.props.event.leagueId
    );

    var facilities = facilityIds.map(function(facilityId, i){
        var facility = FacilityStore.find(facilityId);
        return(
          <option key={i} value={facility.id}> {facility.name} </option>
        );
      });

    facilities.unshift(
      <option key={-1} value={null}> </option>
    );

    return facilities;
  },

  submitReschedule: function(){

    EventActions.attemptReschedule({
      id: this.props.event.id,
      facility_id: parseInt(this.state.newFacility),
      start_time: DateHelper.timeInputStringToNumber(this.state.newGameTime),
      date: DateHelper.dbDateFromInputString(this.state.newGameDate)
    });

    this.resetAndHideRescheduleMenuWithNewParams();
  },

  newGameObject(){
    return {
      leagueId: this.props.event.leagueId,
      team_1_id: this.props.event.team_1_id,
      team_2_id: this.props.event.team_2_id,
      ownId: this.props.event.id
    };
  },

  resetAndHideRescheduleMenuWithNewParams: function(){

    var newGame = this.newGameObject();
    newGame.fieldId = this.state.newFacility;
    newGame.date = this.state.newGameDate;
    newGame.startTime = this.state.newGameTime;

    var errors = EventStore.newGameErrors(newGame);

    this.setState({
      status: null,
      newGameDate: newGame.date,
      newGameTime: newGame.startTime,
      newFacility: newGame.fieldId,
      errors: errors
    });

    this.props.removeFocus();

  },

  resetAndHideRescheduleMenu: function(){

    var newGameDate;
    var newGameTime;
    var newFacility;

    if (EventHelper.isScheduled(this.props.event)){
      newGameDate = DateHelper.JSdateToInputString(this.props.event.date);
      newGameTime = DateHelper.timeStringPrimitiveToInputString(this.props.event.startTime);
      newFacility = this.props.event.facilityId;
    }

    var newGame = this.newGameObject();
    newGame.fieldId = newFacility;
    newGame.date = newGameDate;
    newGame.startTime = newGameTime;

    var errors = EventStore.newGameErrors(newGame);

    this.setState({
      status: null,
      newGameDate: newGameDate,
      newGameTime: newGameTime,
      newFacility: newFacility,
      errors: errors
    });

    this.props.removeFocus();

  },

  changeOption: function(option, e){
    e.preventDefault();

    var state = this.state;
    state[option] = e.target.value;

    var newGame = this.newGameObject();
    newGame.fieldId = state.newFacility;
    newGame.date = state.newGameDate;
    newGame.startTime = state.newGameTime;

    var errors = EventStore.newGameErrors(newGame);
    state.errors = errors;

    this.setState({state});
  },

  newDateDayOfWeek: function() {

    if (this.state.newGameDate) {
      return DateConstants.DAYS_OF_WEEK[
        DateHelper.dateObjectFromInputString(this.state.newGameDate).getDay()
      ];
    }
  },

  resetOptionsAfterUnschedule: function() {
    this.setState({
      status: null,
      newGameDate: null,
      newGameTime: null,
      newFacility: null,
      errors: {incompleteInput: ['select a facility'] }
    });

  },

  getDayOfWeek: function(){
    return this.props.event.dayOfWeek = DateConstants.DAYS_OF_WEEK[
      new Date(this.props.event.date).getDay()
    ];
  },

  entryText: function(){

    var text = {
      team_1_id: TeamStore.find(
        this.props.event.team_1_id).name,
      team_2_id: TeamStore.find(
        this.props.event.team_2_id).name,
      leagueId: LeagueStore.find(
        this.props.event.leagueId).name
    };

    if (EventHelper.isScheduled(this.props.event)){
      text['dayOfWeek'] = this.getDayOfWeek();
      text['date'] = this.props.event.date;
      text['startTime'] = DateHelper.timeAsString(
        DateHelper.timeStringPrimitiveToObj(
        this.props.event.startTime));
      text['facilityId'] = FacilityStore.find(
        this.props.event.facilityId).name;
    }

    return text;
  },

  columnElement: function(column, i) {

    var width = column.width - 10;
    if (width < 10) { width = 10; }
    var leftPad = i === 0 ? 28 : 10

    return(
      <div className={this.props.classInfo.text}
        style={{
          width: width,
          fontWeight: this.props.focused ? 700 : 400,
          paddingLeft: leftPad
        }}
        key={i}>
        {this.entryText()[column.varName]}
      </div>
    );

  },

  columnElements: function(){

    if (EventHelper.isScheduled(this.props.event)){
      return this.props.columns.map(function(column, i){
        return this.columnElement(column, i);
      }, this);

    } else {

      var columnElements = this.props.columns.slice(4,7).map(function(column, i){
        return this.columnElement(column, i);
      }, this)

      var unscheduledWidth = -28;
      this.props.columns.slice(0,4).forEach(function(column){
        unscheduledWidth += column.width;
      })

      columnElements.unshift(
        <div className={'table-entry-text-flagged'}
          style={{width: unscheduledWidth,
            fontWeight: this.props.focused ? 700 : 400,
            paddingLeft: 28
          }}
          key={-1}>
          not currently scheduled!
        </div>
      )

      return columnElements;

    }
  },

  render: function() {

    return (
      <div>
        <div className={this.props.classInfo.header}
          style={{width: this.props.width}}
          onClick={this.callToggle}>
          {this.columnElements()}
        </div>
        {this.detail()}
      </div>
    );

  }

});

module.exports = ListViewEventShow;
