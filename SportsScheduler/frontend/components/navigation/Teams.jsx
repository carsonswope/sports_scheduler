var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Teams = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.TEAMS);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Teams
      </div>
    );
  }

});

module.exports = Teams;
