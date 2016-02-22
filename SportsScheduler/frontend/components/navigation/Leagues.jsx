var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Leagues = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.LEAGUES);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Leagues
      </div>
    );
  }

});

module.exports = Leagues;
