var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var TeamActions = require('../../actions/TeamActions');
var GameDatesInput = require('./GameDatesInput');


var NewTeam = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      contactName: '',
      email: '',
      phone: '',
      gameDates: {
        general: [],
        specific: []
      }
    };
  },

  submitForm: function(e) {
    e.preventDefault();
    TeamActions.createTeam({team: this.state});
  },

  updateGameDatesInput: function(newGameDate){


    var gameDates = this.state.gameDates;

    if (newGameDate.availType === 'SPECIFIC') {
      gameDates.specific.push(newGameDate);
    } else {
      gameDates.general.push(newGameDate);
    }
    this.setState({gameDates: gameDates});

  },

  removeGameDates: function(dateType, index){

    var gameDates = this.state.gameDates;
    if (dateType === 'SPECIFIC') {
      gameDates.specific.splice(index, 1);
        } else{
      gameDates.general.splice(index, 1);
    }

    this.setState({gameDates: gameDates});

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

          <GameDatesInput
            dates={this.state.gameDates}
            update={this.updateGameDatesInput}
            remove={this.removeGameDates}
            weeklyPlus={'Weekly game dates'}
            specificPlus={'Specific additions'}
            specificMinus={'Specific exceptions'}/>

          <input className="new-submit-button"
            type="submit" value="create team" />
        </form>
      </div>
    );
  }

});

module.exports = NewTeam;
