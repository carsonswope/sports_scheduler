var React = require('react');
var PropTypes = React.PropTypes;

var ScheduleShowDetail = React.createClass({

  render: function() {
    return (
      <div className="show-detail">
        {this.props.item.name}
        hello from schedle details
      </div>
    );
  }

});

module.exports = ScheduleShowDetail;
