DateHelper = require('./DateHelper');

exports.generalDatesMap = function(genDates) {

  return genDates.map(function(genDate){
    return({
      first_date: genDate.startDate,
      last_date: genDate.endDate,
      time_start: genDate.startTime,
      time_end: genDate.endTime,
      // positive: true,
      positive: genDate.positive,
      day_of_week: genDate.dayOfWeek
    });
  });

};

exports.generalDate = function(genDate){
  return({
    first_date: genDate.startDate,
    last_date: genDate.endDate,
    time_start: genDate.startTime,
    time_end: genDate.endTime,
    // positive: true,
    positive: genDate.positive,
    day_of_week: genDate.dayOfWeek
  });
}

exports.specificDatesMap = function(specificDates) {

  return specificDates.map(function(spcDate){
    return({
      date: spcDate.date,
      time_start: spcDate.startTime,
      time_end: spcDate.endTime,
      // positive: true
      positive: spcDate.positive
    });
  });
};

exports.specificDate = function(spcDate){
  return({
    date: spcDate.date,
    time_start: spcDate.startTime,
    time_end: spcDate.endTime,
    // positive: true
    positive: spcDate.positive
  });
};

exports.conflicts = function(otherEventsList, eventInfo) {

  return otherEventsList.filter(function(event){
    return exports.overlaps(event, eventInfo)
  });

};

exports.overlaps = function(event, eventInfo){

  // debugger;

  date1 = new Date(event.date);
  date2 = new Date(eventInfo.eventDate);

  if (DateHelper.jsDateSpaceship(date1, date2)){
    return false;
  } else {

    startTime1 = parseInt(event.startTime);
    endTime1 = DateHelper.timePlusMinutes(startTime1, parseInt(event.duration));

    startTime2 = parseInt(eventInfo.eventStartTime);
    endTime2 = DateHelper.timePlusMinutes(startTime2, parseInt(eventInfo.eventDuration));

    return (startTime1 < endTime2 && startTime2 < endTime1);

  }

};
