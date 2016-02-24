var React = require('react');

var FacilityShow = React.createClass({

  render: function() {
    return (
      <div className="show-main">
        <div className="show-header-detail">
          {this.props.facility.name}
        </div>
      </div>
    );
  }

});

module.exports = FacilityShow;
