var React = require('react');
var NavConstants = require('../../constants/NavConstants');
// var NavStore = require('../../stores/NavStore');
var SearchBar = require('../misc/SearchBar');
var NewButton = require('../misc/NewButton');

var LeaguesOptions = React.createClass({

  getInitialState: function() {
    return {

    };
  },


  render: function() {
    return (
      <div className="navbar-expanded"
        style={{height: NavConstants.OPTIONS_HEIGHT}}>
        <SearchBar takeFocus={true} tab={'LEAGUES'} option={'nameSearch'} />
        <NewButton tab={'LEAGUES'} name={'Add a league'} />
      </div>
    );
  }

});

module.exports = LeaguesOptions;
