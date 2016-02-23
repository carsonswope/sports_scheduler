var React = require('react');
var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SearchIcon = require('../misc/SearchIcon');

var TeamsOptions = React.createClass({

  // mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      nameSearch: NavStore.options('TEAMS').nameSearch
    };
  },

  clicked: function() {
    console.log('ah');
  },

  changeSearch: function(e) {
    NavActions.setTabOption('TEAMS', 'nameSearch', e.target.value);
    this.setState({nameSearch: e.target.value});
  },

  clearSearch: function(e) {
    NavActions.setTabOption('TEAMS', 'nameSearch', '');
    this.setState({nameSearch: ''});
  },

  render: function() {
    return (
      <div className="navbar-expanded" style={{height: NavConstants.OPTIONS_HEIGHT}}>
        <div className="navbar-options-search-bar">
          <SearchIcon />
          <input
            className="navbar-options-search-box"
            type="text"
            id="search"
            value={this.state.nameSearch}
            onChange={this.changeSearch}/>
          <div className="navbar-options-clear-icon" onClick={this.clearSearch}>X</div>
        </div>
      </div>
    );
  }

});

module.exports = TeamsOptions;
