var React = require('react');
var PropTypes = React.PropTypes;
var DateHelper = require('../../util/DateHelper');
var DateConstants = require('../../constants/DateConstants');

var EventActions = require('../../actions/EventActions');

var LeagueStore = require('../../stores/LeagueStore');
var LeagueFacilityStore = require('../../stores/LeagueFacilityStore');
var FacilityStore = require('../../stores/FacilityStore');
var TeamStore = require('../../stores/TeamStore');
var EventHelper = require('../../util/EventHelper');

var ListViewEventShow = React.createClass({

  getInitialState: function(){
    return({
      status: null,
      newGameDate: DateHelper.JSdateToInputString(this.props.event.date),
      newGameTime: DateHelper.timeStringPrimitiveToInputString(this.props.event.startTime),
      newFacility: this.props.event.facilityId
    });
  },

  callToggle: function(){
    debugger;
    this.props.toggleFocus(this.props.event.id);
  },

  detail: function(){
    if (this.props.focused){
      if (this.state.status){

        return(
          <div
            style={{
              position: 'relative',
              left: 53,
              height: 26,
              width: 'calc(100% - 75px)',
              borderBottom: '2px solid #16174f'
            }}>

          {this.detailOptions()}

          </div>
        )

      } else {

        return(
          <div
            style={{
              position: 'relative',
              left: 53,
              height: 26,
              width: 'calc(100% - 75px)',
              borderBottom: '2px solid #16174f'
            }}>

          {this.detailOptions()}

          </div>
        )
      }
    }
  },

  detailOptions: function(){
    switch (this.state.status) {
      case null:
        return this.detailChoiceList();
      case 'RESCHEDULE':
        return this.rescheduleForm();
    }
  },

  detailChoiceList: function(){
    return[
      <div className='gamedate-input-button' key={1}
        onClick={this.startRescheduleGame}
        style={{color: '#667467', width: 230}}> reschedule this game </div>,
      <div className='gamedate-input-button' key={2}
        onClick={this.unscheduleGame}
        style={{color: '#667467', width: 230}}> unschedule this game </div>,
      <div className='gamedate-input-button' key={3}
        onClick={this.deleteGame}
        style={{color: '#667467', width: 230}}> delete this game </div>,
    ]
  },

  startRescheduleGame: function() {
    this.setState({
      status: 'RESCHEDULE'
    });
  },

  unscheduleGame: function() {

    this.resetOptions();

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

  rescheduleForm: function() {
    return[
      <div className='info-stat-label' key={0}
        style={{width: 75, paddingLeft: 0}}>new date: </div>,
      <div className='info-stat-text' key={1}
        style={{width: 47}}>{this.newDateDayOfWeek()}</div>,
      <input type='date' key={2}
        className='gamedate-input-form'
        style={{width: 150}}
        value={this.state.newGameDate}
        onChange={this.changeNewGameDate} />,
      <input type='time' key={3}
        className='gamedate-input-form'
        style={{width: 120}}
        value={this.state.newGameTime}
        onChange={this.changeNewGameTime} />,
      <select key={4}
        className='gamedate-input-form'
        style={{}}
        value={EventHelper.isScheduled(this.props.event) ?
          this.state.newFacility : null}
        onChange={this.changeFacility}>
        {this.facilityChoices()}
      </select>,
      <div className='gamedate-input-button' key={5}
        onClick={this.submitReschedule}
        style={{color: '#667467', width: 160, backgroundColor: 'transparent'}}>
        submit reschedule
      </div>,
      <div className='gamedate-input-button' key={6}
        onClick={this.resetOptions}
        style={{color: '#963019', width: 120, backgroundColor: 'transparent'}}>
        cancel reschedule
      </div>
    ]
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

    var date = DateHelper.dbDateFromInputString(this.state.newGameDate);

    EventActions.attemptReschedule({
      id: this.props.event.id,
      facility_id: parseInt(this.state.newFacility),
      start_time: DateHelper.timeInputStringToNumber(this.state.newGameTime),
      date: date
    });

    this.hideRescheduleMenu();

  },

  hideRescheduleMenu: function(){
    this.setState({ status: null });
  },

  changeFacility: function(e){
    e.preventDefault();
    this.setState({ newFacility: e.target.value });
  },

  changeNewGameTime: function(e) {
    e.preventDefault();
    this.setState({ newGameTime: e.target.value });
  },

  changeNewGameDate: function(e) {
    e.preventDefault();
    this.setState({
      newGameDate: e.target.value
    });
  },

  newDateDayOfWeek: function() {
    return DateConstants.DAYS_OF_WEEK[
      DateHelper.dateObjectFromInputString(this.state.newGameDate).getDay()
    ];
  },

  resetOptions: function() {
    this.setState({
      status: null,
      newGameDate: DateHelper.JSdateToInputString(this.props.event.date),
      newGameTime: DateHelper.timeStringPrimitiveToInputString(this.props.event.startTime),
      newFacility: this.props.event.facilityId
    })
  },

  columns: function(){

    if (EventHelper.isScheduled(this.props.event)){

      return [{
        width: 50,
        text: DateConstants.DAYS_OF_WEEK[
              new Date(this.props.event.date).getDay()
            ]
      },{
        width: 100,
        text: this.props.event.date
      },{
        width: 70,
        text: DateHelper.timeAsString(
              DateHelper.timeStringPrimitiveToObj(
              this.props.event.startTime))
      },{
        width: 70,
        text: FacilityStore.find(
          this.props.event.facilityId
          ).name
      },{
        width: 91,
        text: LeagueStore.find(
          this.props.event.leagueId
          ).name
      },{
        width: 170,
        text: TeamStore.find(
          this.props.event.team_1_id
        ).name
      },{
        width: 100,
        text: TeamStore.find(
          this.props.event.team_2_id
        ).name
      }];

    } else {

      return[{
        width: 290,
        color: '#963019',
        text: 'unscheduled'
      },{
        width: 91,
        text: LeagueStore.find(
          this.props.event.leagueId
          ).name
      },{
        width: 170,
        text: TeamStore.find(
          this.props.event.team_1_id
        ).name
      },{
        width: 100,
        text: TeamStore.find(
          this.props.event.team_2_id
        ).name
      }];

    }


  },

  entries: function(){
    this.props.columns.map(function(column){


    });
  },

  getDayOfWeek: function(){

    return this.props.event.dayOfWeek = DateConstants.DAYS_OF_WEEK[
      new Date(this.props.event.date).getDay()
    ];
  },

  entryText: function(){
    return{
      dayOfWeek: this.getDayOfWeek(),
      date: this.props.event.date,
      startTime: DateHelper.timeAsString(
        DateHelper.timeStringPrimitiveToObj(
        this.props.event.startTime)),
      facilityId: FacilityStore.find(
        this.props.event.facilityId).name,
      leagueId: LeagueStore.find(
        this.props.event.leagueId).name,
      team_1_id: TeamStore.find(
        this.props.event.team_1_id).name,
      team_2_id: TeamStore.find(
        this.props.event.team_2_id).name
    }
  },

  columnElements: function(){

    var fontWeight = this.props.focused ? 700 : 400
    var color = '#667467'

    return this.props.columns.map(function(column, i){

      var width = column.width;
      if (width < 16) { width = 16; }

      return(
        <div className='table-entry-text'
          style={{width: width}}
          key={i}>
          {this.entryText()[column.varName]}
        </div>
      );

    }, this);
  },

  render: function() {

    return (
      <div className='table-entry-header'
        onClick={this.callToggle}>
        {this.columnElements()}
      </div>
    );

    return (
      <div>

        <div className='info-stat'
          onClick={this.callToggle}
          style={infoStatStyle}>

          {this.columnElements()}

        </div>

        {this.detail()}

      </div>
    );
  }

});

module.exports = ListViewEventShow;
