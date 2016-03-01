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

  componentWillUnmount: function(){
    this.navListener.remove();
  },

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
    return DateHelper.JSdateToInputString(date)


  },

  getEndDate: function(){
    var date = new Date();
    date.setMonth(date.getMonth()+2);
    return DateHelper.JSdateToInputString(date)

  },

  listViewHeader: function(){
    return(
      <div className='show-detail clear'
        style={{height: 40}}>
        <div className='info-stat-label'
          style={{bottom: -21, width: 105, left: 30}}>
          Date
        </div>

        <div className='info-stat-label'
          style={{bottom: -21, width: 48}}>
          Time
        </div>

        <div className='info-stat-label'
          style={{bottom: -21, width: 50}}>
          Field
        </div>

        <div className='info-stat-label'
          style={{bottom: -21, width: 70}}>
          League
        </div>

        <div className='info-stat-label'
          style={{bottom: -21, width: 150}}>
          Home Team
        </div>

        <div className='info-stat-label'
          style={{bottom: -21, width: 80}}>
          Away Team
        </div>
      </div>
    );
  },

  calendarViewHeader: function(){
    return(
      <div className='show-detail clear'
        style={{height: 40}}>
        calendar header
      </div>
    );
  },

  changeFilterType: function(e){
    e.preventDefault();

    if (e.target.value === 'SHOW_ALL') {
      this.setState({
        filterType: e.target.value,
        filterSpec: 0
      });
      NavActions.setTabOption(
        'SCHEDULES', 'filter', {
          filterType: e.target.value,
          filterSpec: 0,
          startDate: this.state.startDate,
          endDate: this.state.endDate
        }
      );
    } else if (this.state.filterType !== e.target.value) {
      this.setState({
        filterType: e.target.value,
        filterSpec: 0
      });

    };
  },

  changeFilterSpec: function(e){
    e.preventDefault();

    NavActions.setTabOption(
      'SCHEDULES', 'filter', {
        filterType: this.state.filterType,
        filterSpec: e.target.value,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    );

    console.log(this.state);
  },

  changeStartDate: function(e){
    e.preventDefault();

    NavActions.setTabOption(
      'SCHEDULES', 'filter', {
        filterType: this.state.filterType,
        filterSpec: this.state.filterSpec,
        startDate: e.target.value,
        endDate: this.state.endDate
      }
    );
  },

  changeEndDate: function(e){
    e.preventDefault();

    NavActions.setTabOption(
      'SCHEDULES', 'filter', {
        filterType: this.state.filterType,
        filterSpec: this.state.filterSpec,
        startDate: this.state.startDate,
        endDate: e.target.value
      }
    );
  },

  getResourceOptions: function(filter){

    switch (filter) {
      case 'SHOW_ALL':
        return [];
        break;

      case 'BY_LEAGUE':
        return LeagueStore.all().map(function(league){
          return { title: league.name, id: league.id };
        });
        break;

      case 'BY_TEAM':
        return TeamStore.all().map(function(team){
          return { title: team.name, id: team.id };
        });
        break;

      case 'BY_WEEKDAY':
        return Object.keys(DateConstants.DAYS_OF_WEEK).map(function(day){
          return { title: DateConstants.DAYS_OF_WEEK[day], id: day };
        });
        break;
    }

  },

  criteriaOptions: function(){

    var criteriaChoices = [
      { title: 'Show All',      id: 'SHOW_ALL' },
      { title: 'By League',     id: 'BY_LEAGUE'},
      { title: 'By Team',       id: 'BY_TEAM'},
      { title: 'By weekday',    id: 'BY_WEEKDAY'}
    ];

    var criteriaOptionElements = criteriaChoices.map(function(choice, i){
      return(
        <option key={i} value={choice.id}> {choice.title} </option>
      );
    }, this)

    var criteriaSpecElements = this.getResourceOptions(this.state.filterType).map(function(choice, i){
      return( <option key={i} value={choice.id}> {choice.title} </option>
      );
    }, this)

    if (criteriaSpecElements.length)
    criteriaSpecElements.unshift(
      <option key={-1} value={0}>
        {''}
      </option>
    );

    var inputForms = [{
      inputType: 'select',
      inputCallback: this.changeFilterType,
      selectChoices: criteriaOptionElements,
      currentValue: this.state.filterType
    },{
      inputType: 'select',
      inputCallback: this.changeFilterSpec,
      selectChoices: criteriaSpecElements,
      currentValue: this.state.filterSpec
    },{
      inputType: 'date',
      inputCallback: this.changeStartDate,
      dateValue: this.state.startDate
    },{
      inputType: 'date',
      inputCallback: this.changeEndDate,
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
            className='gamedate-input-form'
            style={styleSelect}
            value={form.currentValue}
            onChange={form.inputCallback}>
            {form.selectChoices}
          </select>

        );
      } else {
        return(
          <input type='date' key={i}
            className='gamedate-input-form'
            style={styleDate}
            value={form.dateValue}
            onChange={form.inputCallback} />
        );
      }

    }, this);

  },

  render: function() {

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
          {this.state.criteria.subTab === 'LIST_VIEW' ?
            this.listViewHeader() : this.calendarViewHeader() }
        </div>
      </div>
    );
  }

});

module.exports = ScheduleCriteria;
