var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NavStore = require('../../stores/NavStore');
var TeamStore = require('../../stores/TeamStore');
var LeagueStore = require('../../stores/LeagueStore');
var EventStore = require('../../stores/EventStore');
var DateConstants = require('../../constants/DateConstants');
var DateHelper = require('../../util/DateHelper');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ScheduleCriteria = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){

    var options = NavStore.options('SCHEDULES');
    var filter = options.filter

    return{
      criteria: NavStore.options('SCHEDULES'),
      filterType: filter.filterType,
      filterSpec: filter.filterSpec,
      startDate: filter.startDate,
      endDate: filter.endDate
    };
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){ this.navListener.remove(); },

  navChange: function(){

    var storeOptions = NavStore.options('SCHEDULES').filter;
    this.setState({
      filterType: storeOptions.filterType,
      filterSpec: storeOptions.filterSpec,
      startDate: storeOptions.startDate,
      endDate: storeOptions.endDate,
    });

  },

  getStartDate: function(){
    var date = new Date();
    date.setMonth(date.getMonth()-2);
    return DateHelper.JSdateToInputString(date);
  },

  getEndDate: function(){
    var date = new Date();
    date.setMonth(date.getMonth()+2);
    return DateHelper.JSdateToInputString(date);
  },

  changeSpec: function(varName, e){
    var filter = {
      filterType: this.state.filterType,
      filterSpec: this.state.filterSpec,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    if (varName ==='filterType') {
      if (e.target.value === 'SHOW_ALL') {

        filter.filterSpec = -1;

      } else if (this.state.filterType !== e.target.value) {
        //defer action until spec is selected..
        this.setState({
          filterType: e.target.value,
          filterSpec: -1
        });

        return;
      }
    }

    filter[varName] = e.target.value;

    NavActions.setTabOption( 'SCHEDULES', 'filter', filter );

  },

  getFilterOptions: function(){

    return {
      SHOW_ALL: {
        title: 'Show All',
        choices: []
      },

      BY_LEAGUE: {
        title: 'By League',
        choices: LeagueStore.all().map(function(league){
          return { title: league.name, id: league.id };
        })
      },

      BY_TEAM: {
        title: 'By Team',
        choices: TeamStore.all().map(function(team){
          return { title: team.name, id: team.id };
        })
      },

      BY_WEEKDAY: {
        title: 'By weekday',
        choices: Object.keys(DateConstants.DAYS_OF_WEEK).map(function(day){
          return { title: DateConstants.DAYS_OF_WEEK[day], id: day };
        })
      }

    };
  },

  criteriaOptions: function(){

    var options = this.getFilterOptions();

    var criteriaTypeElements = Object.keys(options).map(function(filterType, i){
      return(
        <option key={i} value={filterType}> {options[filterType].title} </option>
      )
    }, this);

    var criteriaSpecElements = options[this.state.filterType].choices.map(function(choice, i){
      return( <option key={i} value={choice.id}> {choice.title} </option>
      );
    }, this);

    if (criteriaSpecElements.length){
      criteriaSpecElements.unshift(
        <option key={-1} value={-1}> {''} </option>
      );
    };

    var inputForms = [{
      inputType: 'select',
      inputCallback: this.changeSpec.bind(this, 'filterType'),
      selectChoices: criteriaTypeElements,
      currentValue: this.state.filterType
    },{
      inputType: 'select',
      inputCallback: this.changeSpec.bind(this, 'filterSpec'),
      selectChoices: criteriaSpecElements,
      currentValue: this.state.filterSpec
    },{
      inputType: 'date',
      inputCallback: this.changeSpec.bind(this, 'startDate'),
      dateValue: this.state.startDate
    },{
      inputType: 'date',
      inputCallback: this.changeSpec.bind(this, 'endDate'),
      dateValue: this.state.endDate
    }];

    var styleSelect={
      display: 'inline-block',
      left: 0,
      bottom: -20,
      width: 125,
      outline: 'none'
    }

    var styleDate={
      display: 'inline-block',
      left: 0,
      bottom: -20,
      width: 160,
      outline: 'none'
    }

    return inputForms.map(function(form, i){

      if (form.inputType === 'select') {
        return(
          <select key={i}
            className='schedule-criteria-option'
            style={{width: 150}}
            value={form.currentValue}
            onChange={form.inputCallback}>
            {form.selectChoices}
          </select>

        );
      } else {
        return(
          <input type='date' key={i}
            className='schedule-criteria-option'
            value={form.dateValue}
            onChange={form.inputCallback} />

        );
      }

    }, this);

  },

  render: function() {

    return (
      <div>
        <div className='schedule-criteria-main'>
          <div className='schedule-criteria-title'>
            Schedules:
          </div>

          {this.criteriaOptions()}
        </div>
      </div>
    );

    return (
      <div className='show-item show-item-focused'
        style={{
          marginTop: '-44'
        }}>
        <div className='show-option show-option-focused'>
          <div className='show-item-header'
            style={{fontWeight: 400}}>
            <div className='navbar-option'
              style={{width: 900}}>
              <div className='info-stat-label'
                style={{bottom: -21, left: 15,
                  width: 85, display: 'inline-block',
                  fontWeight: 400}}>
                Schedules:
              </div>

              {this.criteriaOptions()}

            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ScheduleCriteria;
