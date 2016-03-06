var DateHelper = require('./DateHelper')
// var EventStore = require('../stores/EventStore');
// var TeamStore = require('../stores/TeamStore');
// var FacilityStore = require('../stores/FacilityStore');
// var LeagueStore = require('../stores/LeagueStore');


exports.isScheduled = function(event) {

  return (
    event &&
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
