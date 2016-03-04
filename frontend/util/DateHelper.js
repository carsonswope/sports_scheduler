exports.timeAsString = function(time){
  var minutes = time.mns.toString();
  while (minutes.length < 2) { minutes = "0" + minutes; }

  var type = ' AM';
  var hours = time.hrs;
  if (time.hrs > 12) {
    type = ' PM';
    hours = hours - 12;
  } else if (time.hrs === 12) {
    type = ' PM';
  } else if (time.hrs === 0) {
    type = ' AM';
    hours = 12;
  }

  return hours + ":" + minutes + type;

};

exports.timeObjToMilitaryNumber = function(time){
  var hrs = time.hrs.toString();
  var mns = time.mns.toString();

  while (hrs.length < 2) { hrs = "0" + hrs; }
  while (mns.length < 2) { mns = "0" + mns; }

  return parseInt(hrs + mns);
};

exports.timePlusMinutes = function(time, minutes){
  var timeObj = exports.timeStringPrimitiveToObj(time.toString());

  timeObj.mns += minutes;

  while (timeObj.mns > 60) {
    timeObj.mns -= 60;
    timeObj.hrs += 1;
  }

  return exports.timeObjToMilitaryNumber(timeObj);

};

exports.timeStringToAmPm = function(time) {

  var items = time.split(':')
  return exports.timeAsString({
    hrs: parseInt(items[0]),
    mns: parseInt(items[1])
  })
};

exports.timeInputStringToNumber = function(timeString) {
  var items = timeString.split(':')
  return parseInt(items[0]+items[1]);
};

exports.timeStringPrimitiveToInputString = function(time) {
  return time.substring(0, time.length-2) + ":" + time.slice(-2);
};

exports.timeStringPrimitiveToObj = function(time) {

  if (time.length === 3 ){
    return {
      hrs: parseInt(time.substring(0,1)),
      mns: parseInt(time.substring(1,3))
    };
  } else {
    return {
      hrs: parseInt(time.substring(0,2)),
      mns: parseInt(time.substring(2,4))
    };
  }

};

exports.dateObjectFromInputString = function(inputString){
  var dateObject = new Date(inputString);
  dateObject.setDate(dateObject.getDate()+1);
  return dateObject

};

exports.sameDate = function(dateString, jsDate) {
  var d1 = new Date(Date.parse(dateString));
  return (
    d1.getDate() === jsDate.getDate() &&
    d1.getMonth() === jsDate.getMonth() &&
    d1.getYear() === jsDate.getYear()
  );
}

exports.dateToString = function(dateString) {

  // debugger;

  var date = new Date(dateString);

  var year = (date.getYear()+1900).toString();
  var day = (date.getDate()+1).toString();
  var month = (date.getMonth()+1).toString();
  while (day.length < 2) { day = "0" + day; }
  while (month.length < 2) { month = "0" + month; }

  return month + '/' + day + '/' + year;
  return date[1] + ' ' + day + ' ' + date[3].substring(2,4);
};

exports.dbDateFromInputString = function(inputString) {
  var components = inputString.split('-');
  return components[1] + '/' + components[2] + '/' + components[0];
};

exports.JSdateToInputString = function(dateString) {

  var date = new Date(dateString);
  var year = (date.getYear()+1900).toString();
  var day = (date.getDate()).toString();
  var month = (date.getMonth()+1).toString();
  while (day.length < 2) { day = "0" + day; }
  while (month.length < 2) { month = "0" + month; }
  return year + '-' + month + '-' + day;

}

exports.todayInputString = function(){

  var date = new Date();
  return exports.JSdateToInputString(date);

};

exports.dateStringSpaceship = function(date1, date2) {
  return exports.jsDateSpaceship(
    new Date(date1),
    new Date(date2)
  );
};

exports.jsDateSpaceship = function(date1, date2) {

  if (date1 > date2) {
    return 1;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 0;
  }

};

exports.startAndEndPositionsFromTimeStrings = function(tableStart, tableEnd, eventStart, eventEnd){

  var tableStartObj = exports.timeStringPrimitiveToObj(tableStart);
  var tableEndObj = exports.timeStringPrimitiveToObj(tableEnd);
  var eventStartObj = exports.timeStringPrimitiveToObj(eventStart);
  var eventEndObj = exports.timeStringPrimitiveToObj(eventEnd);

  var tStartNumber = (tableStartObj.hrs * 60) + tableStartObj.mns;
  var tEndNumber = (tableEndObj.hrs * 60) + tableEndObj.mns;
  var eStartNumber = (eventStartObj.hrs * 60) + eventStartObj.mns;
  var eEndNumber = (eventEndObj.hrs * 60) + eventEndObj.mns;

  return {
    timeDuration: 100 * (eEndNumber - eStartNumber) / (tEndNumber - tStartNumber),
    startPos: 100 * (eStartNumber - tStartNumber) / (tEndNumber - tStartNumber)
  };

}
