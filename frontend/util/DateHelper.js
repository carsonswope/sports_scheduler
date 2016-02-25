exports.timeAsString = function(time){
  var minutes = time.mns.toString();
  while (minutes.length < 2) { minutes = "0" + minutes; }

  var type = ' AM';
  var hours = time.hrs;
  if (time.hrs > 12) {
    type = ' PM';
    hours = hours - 12;
  }

  return hours + ":" + minutes + type;

}

exports.sameDate = function(dateString, jsDate) {
  var d1 = new Date(Date.parse(dateString));
  return (
    d1.getDate() === jsDate.getDate() &&
    d1.getMonth() === jsDate.getMonth() &&
    d1.getYear() === jsDate.getYear()
  );
}
