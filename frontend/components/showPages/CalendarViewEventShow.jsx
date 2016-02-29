var React = require('react');
var PropTypes = React.PropTypes;

var CalendarViewEventShow = React.createClass({

  render: function() {
    return (
      <div>
        calendar view
        {this.props.event.id}
      </div>
    );
  }

});

module.exports = CalendarViewEventShow;
