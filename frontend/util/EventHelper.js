exports.isScheduled = function(event) {

  return (
    event.facilityId &&
    event.date.length &&
    event.startTime.length
  );
};
