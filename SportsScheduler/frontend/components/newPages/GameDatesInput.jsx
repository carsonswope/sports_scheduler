var React = require('react');
var PropTypes = React.PropTypes;

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var GameDatesInput = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){

    return { adding: false, currentParams: {} };

  },

  startAddingWeekly: function(){
    this.setState({adding: 'WEEKLY'})
  },

  startAddingSpecific: function(){
    this.setState({adding: 'SPECIFIC'})
  },

  submit: function(){
    this.props.update(this.state.currentParams);
  },

  render: function() {

    var weeklyDatesList;
    var specificDatesList;

    var weeklyDatesAdder = <div onClick={this.startAddingWeekly}
      className="begin-add-to-button"> add a weekly gamedate </div>;

    var specificDatesAdder = <div onClick={this.startAddingSpecific}
      className="begin-add-to-button"> add a specific gamedate </div>;

    if (this.state.adding === 'WEEKLY') {

      weeklyDatesAdder = <div onClick={this.submit}>w</div>

    } else if (this.state.adding === 'SPECIFIC') {

      specificDatesAdder =
        <div className="create-availability-form">

          <label htmlFor='date'>Date: </label>
          <input type='date' name='date'></input>

          <label htmlFor='startTime'>Start Time: </label>
          <input type='time' name='startTime'></input>

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
