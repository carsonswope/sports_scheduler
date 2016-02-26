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
