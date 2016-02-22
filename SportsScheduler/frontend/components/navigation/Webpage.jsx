var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Webpage = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.WEBPAGE);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Webpage
      </div>
    );
  }

});

module.exports = Webpage;
