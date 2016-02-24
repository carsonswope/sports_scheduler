var React = require('react');
var PropTypes = React.PropTypes;

var LeagueShowDetail = React.createClass({

  render: function() {
    return (
      <div className="show-detail">
        {this.props.item.name}
        hello from league details
      </div>
    );
  }

});

module.exports = LeagueShowDetail;
