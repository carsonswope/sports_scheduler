var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');

var LeagueShowHeader = React.createClass({

  render: function() {
    return (
      <div >
        {this.props.item.id}
        {this.props.item.name}
        hello from league showheader
      </div>
    );
  }

});

module.exports = LeagueShowHeader;
