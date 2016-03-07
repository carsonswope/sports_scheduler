var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');

var GameDatesInput = require('./GameDatesInput');
var FacilitiesInput = require('./FacilitiesInput');

var LinkedStateMixin = require('react-addons-linked-state-mixin');
var LeagueActions = require('../../actions/LeagueActions');

var TextEntriesInput = require('./TextEntriesInput');

var NewLeague = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      numGames: '',
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
        } else{
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
    this.setState({facilities: list});
  },

  cancel: function(){
    NavActions.setTabOption('LEAGUES', 'adding', false);
  },

  focusEntry: function(element){
    this.refs[element].focus();
  },

  textFields: function(){
    return [{
      title: 'Name:',
      varName: 'name',
    },{
      title: 'Number of games per team:',
      varName: 'numGames'
    },{
      title: 'Duration of games (minutes):',
      varName: 'gameDuration'
    }];
  },

  render: function() {

    return(
      <div className='show-item show-item-focused'>

        <NewHeader tab={'LEAGUES'} message={'Create a league:'} />

        <form className='show-detail clear'
          style={{paddingTop: 13}}
          onSubmit={this.submitForm}>

          {TextEntriesInput.makeInputs(this, this.textFields())}

          <GameDatesInput
            dates={this.state.gameDates}
            update={this.updateGameDatesInput}
            remove={this.removeGameDates}
            weeklyPlus={'Weekly game dates'}
            specificPlus={'Specific additions'}
            specificMinus={'Specific exceptions'}/>

          <FacilitiesInput
            fields={this.state.facilities}
            update={this.updateFacilitiesInput}
            remove={this.removeFacilities}
            checkAll={this.checkAllFacilities} />

          <div className='show-basic-info'
            style={{marginBottom: 40}}>
            <div className='info-stat'
              style={{textAlign: 'center'}}>
              <input className="submit-button"
                type="submit" value="Create League!" />
            </div>
          </div>
        </form>

      </div>


    )
  }
});

module.exports = NewLeague;
