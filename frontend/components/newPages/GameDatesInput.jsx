var React = require('react');
var PropTypes = React.PropTypes;

var DateConstants = require('../../constants/DateConstants');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var GameDatesInput = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){

    var today = new Date();
    var year = today.getYear()+1900;
    var month = (today.getMonth()+1).toString();
    var day = today.getDate();
    while (month.length < 2) { month = "0" + month;}
    while (day.length < 2 ) {day = "0" + day; }
    this.today = "" + year + "-" + month + "-" + day;


    return {  adding: false,
              startDate: this.today,
              endDate: this.today,
              startTime: '00:00',
              endTime: '23:59',
              dayOfWeek: 0

    };

  },

  startAddingWeekly: function(){
    this.setState({adding: 'WEEKLY'})
  },

  startAddingSpecific: function(){
    this.setState({adding: 'SPECIFIC'})
  },

  submit: function(){
    if (this.state.adding === 'SPECIFIC') {

      var params = {
        availType: 'SPECIFIC',
        date: this.state.startDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      };

    } else {

      var params = {
        availType: 'GENERAL',
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        dayOfWeek: this.state.dayOfWeek
      };

    }

    this.setState({  adding: false,
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

  render: function() {

    var weeklyDatesList = this.props.dates.general.map(function(date, i){
      return(
        <div key={i}>
          {DateConstants.DAYS_OF_WEEK[date.dayOfWeek]} --
          {date.startDate} -- {date.endDate} --
          {date.startTime} -- {date.endTime}
          <span onClick={this.remove.bind(this, 'GENERAL', i)}>
            remove
          </span>
        </div>
      );
    }, this);


    var specificDatesList = this.props.dates.specific.map(function(date, i){
      return(
        <div key={i}>
          {date.date} --
          {date.startTime} --
          {date.endTime}
          <span onClick={this.remove.bind(this, 'SPECIFIC', i)}>
            remove
          </span>
        </div>
      );
    }, this);

    var weeklyDatesAdder = <div onClick={this.startAddingWeekly}
      className="begin-add-to-button"> add a weekly gamedate </div>;

    var specificDatesAdder = <div onClick={this.startAddingSpecific}
      className="begin-add-to-button"> add a specific gamedate </div>;

    if (this.state.adding === 'WEEKLY') {

      var daysOfWeekOptions = Object.keys(DateConstants.DAYS_OF_WEEK).map(function(i){
        return(
          <option key={i} value={i}>
            {DateConstants.DAYS_OF_WEEK[i]}
          </option>
        );
      }, this)

      weeklyDatesAdder =
        <div className='create-availability-form'>

          <label htmlFor='startDate'>StartDate: </label>
          <input type='date'
            name='startDate'
            valueLink={this.linkState('startDate')}>
          </input>

          <label htmlFor='endDate'>EndDate: </label>
          <input type='date'
            name='endDate'
            valueLink={this.linkState('endDate')}>
          </input>

          <label htmlFor='startTime'>Start Time: </label>
          <input type='time'
            name='startTime'
            valueLink={this.linkState('startTime')}>
          </input>

          <label htmlFor='endTime'>End Time: </label>
          <input type='time'
            name='endTime'
            valueLink={this.linkState('endTime')}>
          </input>

          <label htmlFor='dayOfWeek'>Day of week: </label>
          <select type='select'
            name='dayOfWeek'
            valueLink={this.linkState('dayOfWeek')}>
            {daysOfWeekOptions}
          </select>

          <span onClick={this.submit}>
            add
          </span>

        </div>

    } else if (this.state.adding === 'SPECIFIC') {

      specificDatesAdder =
        <div className="create-availability-form">

          <label htmlFor='date'>Date: </label>
          <input type='date'
            name='date'
            valueLink={this.linkState('startDate')}>
          </input>

          <label htmlFor='startTime'>Start Time: </label>
          <input type='time'
            name='startTime'
            valueLink={this.linkState('startTime')}>
          </input>

          <label htmlFor='endTime'>End Time: </label>
          <input type='time'
            name='endTime'
            valueLink={this.linkState('endTime')}>
          </input>

          <span onClick={this.submit}>
            add
          </span>
        </div>

    }

    return (
      <div className="availability-form-main clear">
        <div className="availability-form-title">GameDates:</div>
        <div className="availability-form-one-half">
          Weekly Dates:
          {weeklyDatesList}
          {weeklyDatesAdder}
        </div>
        <div className="availability-form-one-half">
          Specific Dates:
          {specificDatesList}
          {specificDatesAdder}
        </div>
      </div>
    );
  }

});

module.exports = GameDatesInput;
