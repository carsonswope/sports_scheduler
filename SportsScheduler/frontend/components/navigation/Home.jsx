var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Home = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.HOME);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Home
      </div>
    );
  }

});

module.exports = Home;
