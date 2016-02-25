var React = require('react');
var NavConstants = require('../../constants/NavConstants');
// var NavStore = require('../../stores/NavStore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SchedulesOptions = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      nameSearch: 'hi'
    };
  },

  render: function() {
    return (
      <div className="navbar-expanded"
        style={{height: NavConstants.OPTIONS_HEIGHT}}>
      </div>
    );
  }

});

module.exports = SchedulesOptions;
