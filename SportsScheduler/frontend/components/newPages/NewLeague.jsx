var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var LeagueActions = require('../../actions/LeagueActions');


var NewLeague = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: ''
    };
  },

  submitForm: function(e) {
    e.preventDefault();
    LeagueActions.createLeague({league: this.state});
  },

  render: function() {
    return (
      <div>
        <NewHeader tab={'LEAGUES'} title={'Add a league:'} />

        <form onSubmit={this.submitForm} >
          <div className="new-page-text-field">
            <label className="new-page-label"> Name: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('name')} />
          </div>

          <input className="new-submit-button"
            type="submit" value="create league" />
        </form>
      </div>
    );
  }

});

module.exports = NewLeague;
