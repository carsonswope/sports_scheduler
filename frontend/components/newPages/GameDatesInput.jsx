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

    var weeklyDatesPlusList = this.props.dates.general.map(function(date, i){
      if(!date.positive){return null;}
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

      var weeklyDatesMinusList = this.props.dates.general.map(function(date, i){
        if(date.positive){return null;}
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


    var specificDatesPlusList = this.props.dates.specific.map(function(date, i){
      if(!date.positive){return null;}
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

    var specificDatesMinusList = this.props.dates.specific.map(function(date, i){
      if(date.positive){return null;}
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

    var weeklyDatesPlusAdder = <div onClick={this.setAddingState.bind(this, 'GENERAL', true)}
      className="begin-add-to-button"> add a weekly gamedate </div>;

    var weeklyDatesMinusAdder = <div onClick={this.setAddingState.bind(this, 'GENERAL', false)}

      className="begin-add-to-button"> add a weekly exception to the gamedate </div>;
    var specificDatesPlusAdder = <div onClick={this.setAddingState.bind(this, 'SPECIFIC', true)}
      className="begin-add-to-button"> add a specific gamedate </div>;

    var specificDatesMinusAdder = <div onClick={this.setAddingState.bind(this, 'SPECIFIC', false)}
      className="begin-add-to-button"> add a specific exception to the gamedates list </div>;

    if (this.state.adding === 'GENERAL') {

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

        if (this.state.positive) {
          weeklyDatesPlusAdder = weeklyDatesAdder;
        } else {
          weeklyDatesMinusAdder = weeklyDatesAdder;
        }

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

        if (this.state.positive) {
          specificDatesPlusAdder = specificDatesAdder;
        } else {
          specificDatesMinusAdder = specificDatesAdder;
        }

    }

    var weeklyPlus;
    var weeklyMinus;
    var specificPlus;
    var specificMinus;

    if (this.props.weeklyPlus) {
      weeklyPlus =
        <div className="availability-form-one-half">
          <div className="availability-form-category-title">
            {this.props.specificPlus}
          </div>
          {weeklyDatesPlusList}
          {weeklyDatesPlusAdder}
        </div>;
    }

    if (this.props.weeklyMinus) {
      weeklyMinus =
        <div className="availability-form-one-half">
          <div className="availability-form-category-title">
            {this.props.weeklyMinus}
          </div>
          {weeklyDatesMinusList}
          {weeklyDatesMinusAdder}
        </div>;
    }

    if (this.props.specificPlus) {
      specificPlus =
        <div className="availability-form-one-half">
          <div className="availability-form-category-title">
            {this.props.specificPlus}
          </div>
          {specificDatesPlusList}
          {specificDatesPlusAdder}
        </div>;
    }

    if (this.props.specificMinus) {
      specificMinus =
        <div className="availability-form-one-half">
          <div className="availability-form-category-title">
            {this.props.specificMinus}
          </div>
          {specificDatesMinusList}
          {specificDatesMinusAdder}
        </div>;
    }



    return (
      <div className="availability-form-main clear">
        <div className="availability-form-title">GameDates:</div>
        {weeklyPlus}
        {weeklyMinus}
        {specificPlus}
        {specificMinus}
      </div>
    );
  }

});

module.exports = GameDatesInput;
