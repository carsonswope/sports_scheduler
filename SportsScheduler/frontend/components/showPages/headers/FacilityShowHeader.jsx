var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');

var FacilityShowHeader = React.createClass({

  render: function() {
    return (
      <div >
        {this.props.item.id}
        {this.props.item.name}
        hello from facility showheader
      </div>
    );
  }

});

module.exports = FacilityShowHeader;
