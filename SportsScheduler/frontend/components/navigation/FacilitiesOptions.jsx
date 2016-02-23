var React = require('react');
// var NavConstants = require('../../constants/NavConstants');
// var NavStore = require('../../stores/NavStore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var FaciltiesOptions = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      nameSearch: 'hi'
    };
  },

  clicked: function() {
    console.log('ah');
  },

  render: function() {
    console.log('evaluates');
    return (
      <div className="navbar-expanded" style={{height: 135}}>
        <input type="text" id="search" valueLink={this.linkState('nameSearch')} />
        <div onClick={this.clicked}> facilities options</div>
      </div>
    );
  }

});

module.exports = FaciltiesOptions;
