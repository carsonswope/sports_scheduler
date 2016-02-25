var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FacilityActions = require('../../actions/FacilityActions');


var NewFacility = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: ''
    };
  },

  submitForm: function(e) {
    e.preventDefault();
    FacilityActions.createFacility({facility: this.state});
  },

  render: function() {
    return (
      <div>
        <NewHeader tab={'FACILITIES'} title={'Add a facility:'} />

        <form onSubmit={this.submitForm} >
          <div className="new-page-text-field">
            <label className="new-page-label"> Name: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('name')} />
          </div>

          <input className="new-submit-button"
            type="submit" value="create facility" />
        </form>
      </div>
    );
  }

});

module.exports = NewFacility;
