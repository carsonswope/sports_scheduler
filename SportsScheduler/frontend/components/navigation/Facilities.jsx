var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var Facilities = React.createClass({

  setTab: function() {
    this.props.setTab(NavConstants.tabs.FACILITIES);
  },

  render: function() {
    return (
      <div className="navbar-option"
        onClick={this.setTab}>
        Facilities
      </div>
    );
  }

});

module.exports = Facilities;
