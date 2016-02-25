var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');

var GameDatesInput = require('./GameDatesInput');
var FacilitiesInput = require('./FacilitiesInput');

var LinkedStateMixin = require('react-addons-linked-state-mixin');
var LeagueActions = require('../../actions/LeagueActions');


var NewLeague = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      numTeams: '',
      facilities: [],
      gameDuration: '',
      gameDates: {
        specific: [],
        general: []
      }
    };
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

  submitForm: function(e) {
    e.preventDefault();
    LeagueActions.createLeague({league: this.state});
  },

  removeGameDates: function(dateType, index){

    var gameDates = this.state.gameDates;

    if (dateType === 'SPECIFIC') {
      gameDates.specific.splice(index, 1);
    } else {
      gameDates.general.splice(index, 1);
    }

    this.setState({gameDates: gameDates});
  },

  updateFacilitiesInput: function(newFacility){

    var facilities = this.state.facilities;
    var i = this.state.facilities.indexOf(newFacility);

    if (i > -1) {
      facilities.splice(i, 1);
    } else {
      facilities.push(newFacility);
    }

    this.setState({facilities: facilities});
  },

  removeFacilities: function(i){
    var facilities = this.state.facilities;
    facilities.splice(i);
    this.setState({facilities: facilities});
  },

  checkAllFacilities: function(list) {

    debugger;
    this.setState({facilities: list});
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
            <label className="new-page-label"> Games per team: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('numGames')} />
            <label className="new-page-label"> Game Duration: </label>
            <input className="text-entry-box new-page-entry-box"
              type="text"
              valueLink={this.linkState('gameDuration')} />
          </div>

          <GameDatesInput
            dates={this.state.gameDates}
            update={this.updateGameDatesInput}
            remove={this.removeGameDates}/>

          <FacilitiesInput
            fields={this.state.facilities}
            update={this.updateFacilitiesInput}
            remove={this.removeFacilities}
            checkAll={this.checkAllFacilities} />

          <input className="new-submit-button"
            type="submit" value="create league" />

        </form>
      </div>
    );
  }

});

module.exports = NewLeague;
