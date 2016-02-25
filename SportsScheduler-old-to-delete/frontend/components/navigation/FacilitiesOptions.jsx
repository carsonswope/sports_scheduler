var React = require('react');
var NavConstants = require('../../constants/NavConstants');
// var NavStore = require('../../stores/NavStore');
var SearchBar = require('../misc/SearchBar');
var NewButton = require('../misc/NewButton');

var FaciltiesOptions = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <div className="navbar-expanded"
        style={{height: NavConstants.OPTIONS_HEIGHT}}>
        <SearchBar takeFocus={true} tab={'FACILITIES'} option={'nameSearch'} />
        <NewButton tab={'FACILITIES'} name={'Add a facility'} />
      </div>
    );
  }

});

module.exports = FaciltiesOptions;
