var React = require('react');
var PropTypes = React.PropTypes;

var DateHelper = require('../../util/DateHelper');

var SingleDayView = React.createClass({

  overlayData: function(field){

    var overlays = [];

    var tableStartTime = DateHelper.timeInputStringToNumber(this.props.startTime)
    var tableEndTime = DateHelper.timeInputStringToNumber(this.props.endTime)

    this.props.overlays.forEach(function(overlay, i){

      var overlayStartTime = DateHelper.timeInputStringToNumber(overlay.startTime)
      var overlayEndTime = DateHelper.timeInputStringToNumber(overlay.endTime)

      var positions = DateHelper.startAndEndPositionsFromTimeStrings(
        tableStartTime.toString(),
        tableEndTime.toString(),
        overlayStartTime.toString(),
        overlayEndTime.toString()
      );

      var timeDuration = positions.timeDuration;
      var startPos = positions.startPos;

      var timeDuration = 100 * (overlayEndTime - overlayStartTime) / (tableEndTime - tableStartTime);
      var startPos = 100 * (overlayStartTime - tableStartTime) / (tableEndTime - tableStartTime);

      if (startPos >= 100 || (startPos + timeDuration) <= 0) {
        //dont display
      } else {

        if (startPos < 0) { timeDuration += startPos; startPos = 0; }
        if (startPos + timeDuration > 100) { timeDuration = 100 - startPos; }

        overlays.push(
          <div className='calendar-single-date-column-entry-overlay' key={-1 - i}
            style={{height: '' + timeDuration + '%', top: '' + startPos + '%'}}>
          </div>
        );

      }

    });



    return overlays;

  },

  startHover: function(id){
    this.props.startHover(id);
  },

  stopHover: function(id){
    this.props.stopHover(id);
  },

  toggleFocus: function(id){
    this.props.toggleFocus(id)
  },

  eventData: function(field){

    var events = [];

    var tableStartTime = DateHelper.timeInputStringToNumber(this.props.startTime)
    var tableEndTime = DateHelper.timeInputStringToNumber(this.props.endTime)

    this.props.games.forEach(function(game, i){

      if (game.facilityId === field.id) {

        var positions = DateHelper.startAndEndPositionsFromTimeStrings(
          tableStartTime.toString(),
          tableEndTime.toString(),
          game.startTime,
          game.endTime
        );

        var timeDuration = positions.timeDuration;
        var startPos = positions.startPos;

        if (startPos >= 100 || (startPos + timeDuration) <= 0) {
          //dont display
        } else {

          if (startPos < 0) { timeDuration += startPos; startPos = 0; }
          if (startPos + timeDuration > 100) { timeDuration = 100 - startPos; }

          var className='calendar-single-date-column-entry-event';

          if (this.props.focusedEvent.id === game.id) {
            className = this.props.focusedEvent.focusType === 'HOVER' ?
              'calendar-single-date-column-entry-event-hover' :
              'calendar-single-date-column-entry-event-focus';
          }

          events.push(
            <div className={className} key={1 + i}
              onMouseEnter={this.startHover.bind(this, game.id)}
              onMouseLeave={this.stopHover.bind(this, game.id)}
              onClick={this.toggleFocus.bind(this, game.id)}
              style={{height: '' + timeDuration + '%', top: '' + startPos + '%'}}>
            </div>
          );

        }
      }

    }, this);

    return events;


  },

  columnData: function(field){


    var data = [];

    data = data.concat(this.overlayData(field));
    data = data.concat(this.eventData(field));

    return data;
  },

  columns: function(){
    return this.props.fields.map(function(field, i){
      return (
        <div key={i}
          style={{width: this.widthPercentNoBorder()}}
          className='calendar-single-date-facility-column-main'>

          {this.columnData(field)}

        </div>
      )

    }, this);
  },

  widthPercentNoBorder: function(){
    return '' + 100/this.props.fields.length + '%';
  },

  widthPercent: function(){
    var width = (100/ this.props.fields.length);
    return 'calc(' + width + '% - 2px)';
  },

  facilityLabels: function(){

   return this.props.fields.map(function(field, i){
      return(
        <div key={i}
          style={{width: this.widthPercent()}}
          className='calendar-single-date-facility-label'>
          {field.name}
        </div>
      )
    }, this);

  },

  render: function() {

    return (
      <div className='calendar-single-date-main' >
        <div className='calendar-single-date-date'>
          {this.props.date}
        </div>
        <div className='calendar-single-date-inner'>

          {this.columns()}

        </div>
        <div className='calendar-single-date-facility-labels-main'>

          {this.facilityLabels()}

        </div>

      </div>
    );
  }

});

module.exports = SingleDayView;
