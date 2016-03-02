var DateHelper = require('./DateHelper')
var EventStore = require('../stores/EventStore');

exports.isScheduled = function(event) {

  return (
    event.facilityId &&
    event.date.length &&
    event.startTime.length
  );
};

exports.eventStartSpaceship = function(event1, event2){
  var date1 = new Date(event1.date);
  var date2 = new Date(event2.date);

  var dateComparison = DateHelper.jsDateSpaceship(date1, date2);

  if (dateComparison) { return dateComparison; }

  var time1 = parseInt(event1.startTime);
  var time2 = parseInt(event2.startTime);

  if (time1 > time2) {
    return 1;
  } else if (time1 < time2) {
    return -1;
  } else {
    return 0;
  }

};

exports.validEvent = function(event, filter){

  var eventDate = new Date(event.date);

  if (filter.startDate) {
    var startDate = new Date(filter.startDate);
    if (startDate > eventDate) {
      return false;
    }
  }

  if (filter.endDate) {
    var endDate = new Date(filter.endDate);
    endDate.setDate(endDate.getDate()+1);
    if (endDate <= eventDate) {
      return false;
    }
  }

  if (parseInt(filter.filterSpec) !== -1) {
    var spec = parseInt(filter.filterSpec)
    if (filter.filterType === 'BY_LEAGUE') {
      if (event.leagueId !== spec) {
        return false;
      }
    } else if (filter.filterType === 'BY_TEAM') {
      if (event.team_1_id !== spec &&
          event.team_2_id !== spec)   {
        return false;
      }
    } else if (filter.filterType === 'BY_WEEKDAY') {
      if (eventDate.getDay() !== spec) {
        return false;
      }
    } else if (filter.filterType === 'BY_FACILITY') {
      if (event.facilityId !== spec) {
        return false;
      }
    }
  }

  return true;
};
