var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var GameDatesInput = require('./GameDatesInput');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var LeagueActions = require('../../actions/LeagueActions');


var NewLeague = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      gameDates: []
    };
  },

  updateGameDatesInput: function(newGameDate){
    // var newGameDates = this.state.gameDates.concat([newGameDate])
    // this.setState({gameDates: newGameDates });
    console.log(newGameDate);
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

          <GameDatesInput dates={this.state.gameDates} update={this.updateGameDatesInput} />

          <input className="new-submit-button"
            type="submit" value="create league" />
        </form>
      </div>
    );
  }

});

module.exports = NewLeague;
