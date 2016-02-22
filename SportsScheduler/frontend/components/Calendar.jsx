var React = require('react');
var DayView = require('./DayView');

var FacilityStore = require('../stores/FacilityStore');
// var DateConstants = require('../constants/DateConstants');

var Calendar = React.createClass({

  getInitialState: function() {
    return {
      date: new Date()
    };
  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(newProps) {

  },



  render: function() {

    var facilities = this.props.facilities;
    if (!facilities) { facilities = []; }

    var days = [];
    var startDay = new Date(Date.parse('7/2/2016'));
    var day =0;

    while (day < 7) {
      days.push(
        new Date(startDay.setDate(startDay.getDate() + 1))
      );
      day += 1;
    }

    var week = days.map(function(day, i){
      return (
          <DayView facilities={facilities} key={i}
            date={day}
            viewInfo={{
              startTime:{hrs: 18, mns: 25},
              endTime:{hrs: 22, mns: 40}
            }}
            w={135}
            h={200} />
        );
    });

    return (
      <div>
        {week}
      </div>
    );
  }

});

module.exports = Calendar;
