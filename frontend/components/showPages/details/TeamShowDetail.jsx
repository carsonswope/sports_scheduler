var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueStore = require("../../../stores/LeagueStore");
var TeamStore = require('../../../stores/TeamStore');
var LeagueActions = require('../../../actions/LeagueActions');
var AvailabilityActions = require('../../../actions/AvailabilityActions');

var AddToComponent = require('../../navigation/AddToComponent');
var GameDatesInput = require('../../newPages/GameDatesInput');

var TeamShowDetail = React.createClass({

  getInitialState: function(){

    return {
      leagues: LeagueTeamStore.leagues(this.props.item.id),
      gameDates: {
        specific: this.props.item.specificAvailabilities || [],
        general:  this.props.item.generalAvailabilities || []
      }
    };
  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.leagueTeamStoreChange);
    this.teamListener = TeamStore.addListener(this.teamChange);
  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
    this.teamListener.remove();

  },

  leagueTeamStoreChange: function(){
    this.setState({
      leagues: LeagueTeamStore.leagues(this.props.item.id)
    });
  },

  teamChange: function(){

    var updatedTeam = TeamStore.find(this.props.item.id);

    this.setState({
      gameDates: {
        specific: updatedTeam.specificAvailabilities || [],
        general: updatedTeam.generalAvailabilities || []
      }
    });

  },

  addToLeague: function(leagueId){
    LeagueActions.createLeagueTeam(leagueId, this.props.item.id);
  },

  removeFromLeague: function(leagueId){
    LeagueActions.destroyLeagueTeam(leagueId, this.props.item.id);
  },

  addNewGameDate: function(newGameDate){

    AvailabilityActions.attemptCreateAvailability(
      newGameDate,
      'Team',
      this.props.item.id
    );
  },

  removeGameDate: function(dateType, index){

    var gameDates = this.state.gameDates;
    var dateToRemove;

    if (dateType === 'SPECIFIC') {
      dateToRemoveId = gameDates.specific[index].id;
        } else{
      dateToRemoveId = gameDates.general[index].id;
    }

    AvailabilityActions.attemptDestroyAvailability(dateType, dateToRemoveId)
  },

  render: function() {


    var team = this.props.item;

    var leagues = this.state.leagues.map(function(leagueId){
      return LeagueStore.find(leagueId);
    });

    var leaguesList = leagues.map(function(league){
      return(
        <div key={league.id}>
          <span> {league.name} </span>
          <div onClick={this.removeFromLeague.bind(this, league.id)}
            className='delete-from-list-button'> X </div>
        </div>);
    }, this);


    var possibleLeaguesToAdd =
      LeagueStore.opposite(this.state.leagues).
      map(function(leagueId){
        return LeagueStore.find(leagueId);
      });

    return (
      <div className="show-detail clear">

        <div className="show-basic-info">
          <div className="info-stat">
            {team.contactName}
          </div>
          <div className="info-stat">
            {team.email}
          </div>
          <div className="info-stat">
            {team.phone}
          </div>
        </div>


        <div className="leagues-list">
          {leaguesList}
        </div>


        <div className="add-to-menu">
          <AddToComponent
            makeAdd={this.addToLeague}
            list={possibleLeaguesToAdd}
            message={'Add to a league'}
            item={'leagues'} />
        </div>

        <GameDatesInput
          dates={this.state.gameDates}
          update={this.addNewGameDate}
          remove={this.removeGameDate}
          weeklyPlus={'Weekly game dates'}
          specificPlus={'Specific additions'}
          specificMinus={'Specific exceptions'}/>



      </div>
    );
  }

});

module.exports = TeamShowDetail;
