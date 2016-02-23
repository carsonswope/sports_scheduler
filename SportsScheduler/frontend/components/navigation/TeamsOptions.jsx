var React = require('react');
var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var SearchBar = require('../misc/SearchBar');
var NewButton = require('../misc/NewButton');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');

var TeamsOptions = React.createClass({

  // mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {

    };
  },

  render: function() {
    return (
      <div className="navbar-expanded"
        style={{height: NavConstants.OPTIONS_HEIGHT}}>
        <SearchBar tab={'TEAMS'} option={'nameSearch'} />
        <NewButton tab={'TEAMS'} name={'Add a team'} />
      </div>
    );
  }

});

module.exports = TeamsOptions;
