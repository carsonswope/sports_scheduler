var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var NewTeam = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      contactName: '',
      email: '',
      phone: ''
    };
  },

  submitForm: function() {
    debugger;
  },

  render: function() {
    return (
      <div>
        <NewHeader tab={'TEAMS'} title={'Add a team:'} />

        <form onSubmit={this.submitForm} >
          <div className="new-page-text-field">
            <label className="new-page-label"> Name: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('name')} />
          </div>

          <div className="new-page-text-field">
            <label className="new-page-label"> Contact name: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('contactName')} />
          </div>

          <div className="new-page-text-field">
            <label className="new-page-label"> Email: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('email')} />
          </div>

          <div className="new-page-text-field">
            <label className="new-page-label"> Phone: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('phone')} />
          </div>

          <input type="submit" value="create team" />
        </form>
      </div>
    );
  }

});

module.exports = NewTeam;
