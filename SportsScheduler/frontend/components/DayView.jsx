var React = require('react');
var DateHelper = require('../util/DateHelper');

var DayView = React.createClass({

    render: function() {


    var minTimeRange = (this.props.viewInfo.facilities.length) * 100;
    var minFieldLabelRange = (this.props.viewInfo.facilities.length) * 80;

    if (this.props.w < minTimeRange) {
      bubbleIn = 5;
    } else {
      bubbleIn = 85;
    }

    if (this.props.w < minFieldLabelRange) {
      var fieldLabeling = false;
    } else {
      var fieldLabeling = true;
    }

    var outerDims = {
      width:  this.props.w,
      height: this.props.h
    };

    var mainDims = { height: this.props.h - 80 };

    var startMinuteOfWindow =
      ((this.props.viewInfo.startTime.hrs * 60) + (this.props.viewInfo.startTime.mns));

    var totalMinutesOfWindow =
      ((this.props.viewInfo.endTime.hrs * 60) + (this.props.viewInfo.endTime.mns)) -
      startMinuteOfWindow

    var width = (this.props.w - (bubbleIn+10))/
      (this.props.viewInfo.facilities.length);

    var fieldInfo = this.props.viewInfo.facilities.map(function(field, i){

      var fieldWidth ={
        width: width,
        left: (bubbleIn)+(width*i),
        height: '100%'
      }

      var events = field.events.map(function(event, j){

        var startMinuteOfEvent =
          ((event.startTime.hrs * 60) + (event.startTime.mns));

        var totalMinutesOfEvent =
          ((event.endTime.hrs * 60) + (event.endTime.mns)) -
          startMinuteOfEvent;

        var startPosOfEvent =
          (startMinuteOfEvent - startMinuteOfWindow) / totalMinutesOfWindow;

        var heightOfEvent =
          (totalMinutesOfEvent / totalMinutesOfWindow);

        var eventPosition = {
          position: 'absolute',
          top: (startPosOfEvent*100).toString() + "%",
          height: (heightOfEvent*100).toString() + "%",
          width:'100%',
          zIndex: 0
        };

        var timeMarkers = [];

        if (startMinuteOfEvent !== startMinuteOfWindow){
          timeMarkers.push(
            <hr className='day-view-event-mouseover-detail'
              style={{
                width: ((width) * this.props.viewInfo.facilities.length) + 8,
                top: -4   ,
                left: -(6 + width*i)
              }}
              key={1} />);
          if (bubbleIn > 10) {
            timeMarkers.push(
              <div className="day-view-event-mouseover-detail block-beneath"
                style={{
                  position: 'absolute',
                  top: -14,
                  left: -(bubbleIn + (width*i)),
                }} key={2}>
                {DateHelper.timeAsString(event.startTime)}
              </div>
            );
          }
        }

        if (startMinuteOfEvent + totalMinutesOfEvent !==
            startMinuteOfWindow + totalMinutesOfWindow){
          timeMarkers.push(
            <hr className='day-view-event-mouseover-detail'
              style={{
                width: ((width) * this.props.viewInfo.facilities.length) + 8,
                bottom: -4,
                left: -(6 + width*i)
              }}
              key={3} />);
          if (bubbleIn > 10) {
            timeMarkers.push(
              <div className="day-view-event-mouseover-detail block-beneath"
                style={{
                  position: 'absolute',
                  bottom: -8,
                  left: -(bubbleIn + (width*i)),
                }}
                key={4}>
                {DateHelper.timeAsString(event.endTime)}
              </div>
            );
          }
        }

        return(
          <div className='day-view-event' key={j} style={eventPosition}>
            {timeMarkers}
          </div>
        )

      }, this)

      return(

        <div className="day-view-field" key={i} style={fieldWidth}>
          {events}
        </div>

      );

    }, this);

    var fieldLabels = this.props.viewInfo.facilities.map(function(field, i){

      var positionInfo = {
        width: width,
        left: (bubbleIn)+(width*i),
      }

      return(
        <div className='day-view-field-label' style={positionInfo} key={i}>
          {field.name}
        </div>
      );

    });

    var dateString;

    if (fieldLabeling) {
      dateString = this.props.viewInfo.date.toDateString();
    } else {
      dateString = "" +
        (this.props.viewInfo.date.getUTCMonth() + 1).toString() + "/" +
        (this.props.viewInfo.date.getDate()) + "/" +
        this.props.viewInfo.date.getFullYear().toString().substring(2,4);
    }


    return (


      <div className="day-view" style={outerDims}>
        <div className="day-view-header">
          {dateString}
        </div>
        <div className='day-view-main' style={mainDims}>
          <div className='day-view-main-time' >
            <div className='day-view-start-time'>
              <hr style={{
                  bottom: '35%',
                  width: outerDims.width - (bubbleIn + 8),
                  left: bubbleIn,
                  zIndex: 1 }}
                key={1}/>
                {bubbleIn > 10 ? DateHelper.timeAsString(this.props.viewInfo.startTime) : "-"}
            </div>
            <div className='day-view-end-time'>
              <hr style={{
                  bottom: '35%',
                  width: outerDims.width - (bubbleIn + 8),
                  left: (bubbleIn),
                  zIndex: 1 }} key={2}/>
              {bubbleIn > 10 ? DateHelper.timeAsString(this.props.viewInfo.endTime) : "-"}
            </div>
            {fieldInfo}
          </div>
        </div>
        <div className='day-view-footer'>
          {fieldLabeling ? fieldLabels : " "}
        </div>

      </div>
    );
  }

});

module.exports = DayView;
