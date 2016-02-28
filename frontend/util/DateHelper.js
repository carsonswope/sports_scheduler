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

}

exports.timeStringToAmPm = function(time) {

  var items = time.split(':')
  return exports.timeAsString({
    hrs: parseInt(items[0]),
    mns: parseInt(items[1])
  })


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
