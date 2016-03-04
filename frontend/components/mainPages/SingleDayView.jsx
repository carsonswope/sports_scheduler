var React = require('react');
var PropTypes = React.PropTypes;

var DateHelper = require('../../util/DateHelper');

var SingleDayView = React.createClass({

  columnData: function(field){

    var tableStartTime = DateHelper.timeInputStringToNumber(this.props.startTime)
    var tableEndTime = DateHelper.timeInputStringToNumber(this.props.endTime)

    var data = [];

    if (this.props.overlay){
      var overlayStartTime = DateHelper.timeInputStringToNumber(this.props.overlay.startTime)
      var overlayEndTime = DateHelper.timeInputStringToNumber(this.props.overlay.endTime)
    }

    var timeDuration = 100 * (overlayEndTime - overlayStartTime) / (tableEndTime - tableStartTime);
    var startPos = 100 * (overlayStartTime - tableStartTime) / (tableEndTime - tableStartTime);

    if (startPos >= 100 || (startPos + timeDuration) <= 0) {
      //dont display
    } else {

      if (startPos < 0) { timeDuration += startPos; startPos = 0; }
      if (startPos + timeDuration > 100) { timeDuration = 100 - startPos; }

      data.push(
        <div className='calendar-single-date-column-entry' key={data.length}
          style={{height: '' + timeDuration + '%', top: '' + startPos + '%'}}>
        </div>
      );

    }

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
          {DateHelper.dbDateFromInputString(this.props.date)}
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
