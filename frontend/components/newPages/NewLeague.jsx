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
      title: 'Number of games:',
      varName: 'nunmGames'
    }];
  },

  textEntries: function(){

    return this.textFields().map(function(entry, i){

      return(
        <div className='info-stat'
          style={{width: 520}}
          key={i}
          onClick={this.focusEntry.bind(this, entry.varName)}>
        <div className='info-stat-label'>
          {entry.title}
        </div>
        <input className="info-stat-text text-entry-box"
          type="text"
          ref={entry.varName}
          style={{bottom: -2, color: '#16174f'}}
          valueLink={this.linkState(entry.varName)} />
        </div>
      );

    }, this)

  },

  render: function() {

    return(
      <div className='show-item show-item-focused'>
        <div className='show-item-header'>
          <div className='navbar-option'>
            <div className='navbar-tab-title navbar-tab-title-selected'>
              Create a league:
            </div>
          </div>
          <div className='header-delete-button main-element-text'
            onClick={this.cancel}>
            cancel
          </div>
        </div>

        <form className='show-detail clear'
          style={{paddingTop: 13}}
          onSubmit={this.submitForm}>

          {this.textEntries()}

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

          <div className='show-item-show-item-focused'>
            <input className=""
              type="submit" value="create league" />
          </div>
        </form>


      </div>


    )

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
            remove={this.removeGameDates}
            weeklyPlus={'Weekly game dates'}
            specificPlus={'Specific additions'}
            specificMinus={'Specific exceptions'}/>

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
