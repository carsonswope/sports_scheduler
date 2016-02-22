var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Schedules = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.SCHEDULES);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Schedules
      </div>
    );
  }

});

module.exports = Schedules;
