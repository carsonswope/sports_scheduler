var React = require('react');
var PropTypes = React.PropTypes;

var DateConstants = require('../../constants/DateConstants');

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
    var day = today.getDate();
    while (month.length < 2) { month = "0" + month;}
    while (day.length < 2 ) {day = "0" + day; }
    return "" + year + "-" + month + "-" + day;
  },

  setAddingState: function(availType, positive) {
    this.setState({adding: availType, positive: positive});
  },

  submit: function(){

    params = {
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

  generalList: function(datesList, positive) {
    return datesList.map(function(date, i){
      if (date.positive !== positive) {return null;}
      return(
        <div key={i}>
          {DateConstants.DAYS_OF_WEEK[date.dayOfWeek]} --
          {date.startDate} -- {date.endDate} --
          {date.startTime} -- {date.endTime}
          <span onClick={this.remove.bind(this, 'GENERAL', i)}>
            remove
          </span>
        </div>
      )
    }, this);
  },

  specificList: function(datesList, positive) {
    return datesList.map(function(date, i){
      if (date.positive !== positive) {return null;}
      return(
        <div key={i}>
          {date.date} --
          {date.startTime} --
          {date.endTime}
          <span onClick={this.remove.bind(this, 'SPECIFIC', i)}>
            remove
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
        {varName: 'date', varLabel: 'Date:', format: 'date'},
        {varName: 'startTime', varLabel: 'Start Time:', format: 'time'},
        {varName: 'endTime', varLabel: 'End Date:', format: 'time'}
      ];

    }

    var form = categories.map(function(form, i){
      return(
        <div key={i}>
          <label htmlFor={form.varName}>{form.varLabel}</label>
          <input type={form.format} name={form.varName}
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

    form.push(
      <div key={-1}>
        <label htmlFor='dayOfWeek'>Day of week: </label>
        <select type='select'
          name='dayOfWeek'
          valueLink={this.linkState('dayOfWeek')}>
          {daysOfWeekOptions}
        </select>
      </div>
    );


    form.unshift(
      <div onClick={this.submit} key={-2} style={{'top': -30, 'zIndex': 8}}>
        add
      </div>
    );

    return form;
  },

  buttonForAddMenu: function(formType, positive, message) {
    return(
      <div onClick={this.setAddingState.bind(this, formType, positive)}
        className='button-for-add-menu'> {message} </div>
    );
  },

  allListsAndForms: function() {
    var forms = [];

    var options = [
      {
        addingType: 'GENERAL',
        positive: true,
        list: this.generalList(this.props.dates.general, true),
        message: this.props.weeklyPlus
      },{
        addingType: 'GENERAL',
        positive: false,
        list: this.generalList(this.props.dates.general, false),
        message: this.props.weeklyMinus
      },{
        addingType: 'SPECIFIC',
        positive: true,
        list: this.specificList(this.props.dates.specific, true),
        message: this.props.specificPlus
      },{
        addingType: 'SPECIFIC',
        positive: false,
        list: this.specificList(this.props.dates.specific, false),
        message: this.props.specificMinus
      }
    ];

    return options.map(function(options, i){

      var buttonOrMenu;

      if (!options.message) { return null; }

      if (this.state.adding === options.addingType &&
          this.state.positive === options.positive) {
        buttonOrMenu = this.datesForm(this.state.adding);
      } else {
        buttonOrMenu = this.buttonForAddMenu(
          options.addingType,
          options.positive,
          "add a " + options.message
        );
      }

      return(
        <div className="availability-form-one-half" key={i}>
          <div className="availability-form-category-title">
            {options.message}
          </div>
          {options.list}
          {buttonOrMenu}
        </div>
      );

    }, this);

  },

  render: function() {

    return (
      <div className="availability-form-main clear">
        <div className="availability-form-title">GameDates:</div>
        {this.allListsAndForms()}
      </div>
    );

  }

});

module.exports = GameDatesInput;
