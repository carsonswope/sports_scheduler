var React = require('react');
var PropTypes = React.PropTypes;

var DateConstants = require('../../constants/DateConstants');
var DateHelper = require('../../util/DateHelper');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var GameDatesInput = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){

    this.today = this.getToday();

    return {  adding: false,
              startDate: this.today,
              endDate: this.today,
              startTime: '00:00',
              endTime: '23:59',
              dayOfWeek: 0

    };

  },

  getToday: function(){
    var today = new Date();
    var year = today.getYear()+1900;
    var month = (today.getMonth()+1).toString();
    var day = (today.getDate()).toString();
    while (month.length < 2) { month = "0" + month;}
    while (day.length < 2 ) {day = "0" + day; }
    return "" + year + "-" + month + "-" + day;
  },

  setAddingState: function(availType, positive) {
    this.setState({adding: availType, positive: positive});
  },

  submit: function(){

    var params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      availType: this.state.adding,
      positive: this.state.positive
    }

    if (this.state.adding === 'SPECIFIC') {
      params['date'] = this.state.startDate;
    } else {
      params['startDate'] = this.state.startDate;
      params['endDate'] = this.state.endDate;
      params['dayOfWeek'] = this.state.dayOfWeek;
    }

    this.setState({
      adding: false,
      startDate: this.today,
      endDate: this.today,
      startTime: '00:00',
      endTime: '23:59',
      dayOfWeek: 0
    });

    this.props.update(params);

  },

  remove: function(dateType, index) {
    this.props.remove(dateType, index);
  },

  cancelAdding: function(){
    this.setState({
      adding: false,
      startDate: this.today,
      endDate: this.today,
      startTime: '00:00',
      endTime: '23:59',
      dayOfWeek: 0
    });
  },

  generalList: function(datesList, positive) {
    return datesList.map(function(date, i){
      if (date.positive !== positive) {return null;}

      return(
        <div className='add-component-option' key={i}
          style={{width: 500}}>
          <div className='info-stat-text'>


            <span className='gamedate-stat-info'
              style={{ width: 74 }}>
              {DateHelper.timeStringToAmPm(date.startTime)}
            </span>

            <span className='gamedate-stat-label'
              style={{ width: 15 }}>to
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 113 }}>
              {DateHelper.timeStringToAmPm(date.endTime)}
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 45 }}>
              {DateConstants.DAYS_OF_WEEK[date.dayOfWeek]}
            </span>

            <span className='gamedate-stat-label'
              style={{ width: 10 }}>
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 94 }}>
              {DateHelper.dbDateFromInputString(date.startDate)}
            </span>

            <span className='gamedate-stat-label'
              style={{ width: 20 }}>to
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 107 }}>
              {DateHelper.dbDateFromInputString(date.endDate)}
            </span>


          </div>

          <span onClick={this.remove.bind(this, 'GENERAL', i)}
            className='navbar-options-clear-icon'>
            X
          </span>
        </div>
      )
    }, this);
  },

  specificList: function(datesList, positive) {
    return datesList.map(function(date, i){
      if (date.positive !== positive) {return null;}
      return(
        <div className='add-component-option' key={i}
          style={{width: 500}}>
          <div className='info-stat-text'>

            <span className='gamedate-stat-info'
              style={{ width: 74 }}>
              {DateHelper.timeStringToAmPm(date.startTime)}
            </span>

            <span className='gamedate-stat-label'
              style={{ width: 15 }}>to
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 158 }}>
              {DateHelper.timeStringToAmPm(date.endTime)}
            </span>

            <span className='gamedate-stat-label'
              style={{ width: 10 }}>
            </span>

            <span className='gamedate-stat-info'
              style={{ width: 221 }}>
              {DateHelper.dbDateFromInputString(date.date)}
            </span>


          </div>

          <span onClick={this.remove.bind(this, 'SPECIFIC', i)}
            className='navbar-options-clear-icon'>
            X
          </span>
        </div>

      )
    }, this);

  },

  datesForm: function(formType) {
    var categories;

    if (formType === 'GENERAL') {

      categories = [
        {varName: 'startDate', varLabel: 'Start Date:', format: 'date'},
        {varName: 'endDate', varLabel: 'End Date:', format: 'date'},
        {varName: 'startTime', varLabel: 'Start Time:', format: 'time'},
        {varName: 'endTime', varLabel: 'End Date:', format: 'time'}
      ];

    } else if (formType === 'SPECIFIC') {

      categories = [
        {varName: 'startDate', varLabel: 'Date:', format: 'date'},
        {varName: 'startTime', varLabel: 'Start Time:', format: 'time'},
        {varName: 'endTime', varLabel: 'End Date:', format: 'time'}
      ];

    }

    var form = categories.map(function(form, i){
      var style = {width: 500}
      if (!i) { style['marginTop'] = 26; }
      return(
        <div key={i} className='add-component-option'
          style={style}>
          <label className='info-stat-label'
            style={{paddingLeft: 0}}
            htmlFor={form.varName}>
            {form.varLabel}
          </label>

        <input className='gamedate-input-form'
          type={form.format}
          name={form.varName}
            valueLink={this.linkState(form.varName)}>
          </input>
        </div>
      );
    }, this)

    var daysOfWeekOptions = Object.keys(DateConstants.DAYS_OF_WEEK).map(function(i){
      return(
        <option key={i} value={i}>
          {DateConstants.DAYS_OF_WEEK[i]}
        </option>
      );
    }, this)

    if (formType === 'GENERAL') {
      form.push(
        <div key={-1} className='add-component-option'
          style={{width: 500}}>
          <label className='info-stat-label'
            style={{paddingLeft: 0}}
            htmlFor='dayOfWeek'>Day of week: </label>
          <select type='select'
            name='dayOfWeek'
            className='gamedate-input-form'
            style={{left: -6}}
            valueLink={this.linkState('dayOfWeek')}>
            {daysOfWeekOptions}
          </select>
        </div>
      );
    }


    form.push(
      <div className='add-component-option'
        style={{width: 500}}
        key={-2}>

        <div className='gamedate-input-button gamedate-input-cancel-button'
          onClick={this.cancelAdding}
          style={{paddingLeft: 0}}>
          cancel
        </div>

        <div className='gamedate-input-button gamedate-input-submit-button'
          onClick={this.submit}
          style={{paddingLeft: 0}}>
          Add this game date
        </div>
      </div>
    );

    return form;
  },

  buttonForAddMenu: function(formType, positive, message) {
    return(
      <div
        className='add-component-option'
        onClick={this.setAddingState.bind(this, formType, positive)}
        style={{width: 500}}>
        <div
          className='gamedate-input-button gamedate-input-submit-button'
          style={{paddingLeft: 0}}>
          {message}
        </div>
      </div>
    );
  },

  allListsAndForms: function() {
    var forms = [];

    var options = [
      {
        addingType: 'GENERAL',
        positive: true,
        list: this.generalList(this.props.dates.general, true),
        message: this.props.weeklyPlus,
        buttonMessage: 'add a weekly game date'
      },{
        addingType: 'GENERAL',
        positive: false,
        list: this.generalList(this.props.dates.general, false),
        message: this.props.weeklyMinus,
        buttonMessage: 'add a weekly exception to the game dates'
      },{
        addingType: 'SPECIFIC',
        positive: true,
        list: this.specificList(this.props.dates.specific, true),
        message: this.props.specificPlus,
        buttonMessage: 'add a specific game date'

      },{
        addingType: 'SPECIFIC',
        positive: false,
        list: this.specificList(this.props.dates.specific, false),
        message: this.props.specificMinus,
        buttonMessage: 'add a specific exception to the game dates'

      }
    ];

    return options.map(function(options, i){

      var buttonOrMenu;

      if (!options.message) { return null; }

      if (this.state.adding === options.addingType &&
          this.state.positive === options.positive) {
        buttonOrMenu =
          <div className='dates-input-form'>
            {this.datesForm(this.state.adding)}
          </div>;

      } else {
        buttonOrMenu = this.buttonForAddMenu(
          options.addingType,
          options.positive,
          options.buttonMessage
        );
      }

      return(
        <div className="show-basic-info" key={i}>
          <div className="info-stat">
            <div className="info-stat-label">
              {options.message}
            </div>
          </div>
          {options.list}

          {buttonOrMenu}

        </div>
      );

    }, this);

  },

  render: function() {

    return (
      <div className='show-basic-info'
        style={{marginBottom: 14}}>
        {this.allListsAndForms()}
      </div>
    );

  }

});

module.exports = GameDatesInput;
