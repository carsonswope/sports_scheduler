var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');

var TeamShowHeader = React.createClass({

  render: function() {
    return (
      <div >
        {this.props.item.id} - 
        {this.props.item.name}
      </div>
    );
  }

});

module.exports = TeamShowHeader;