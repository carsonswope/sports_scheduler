var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../../../stores/LeagueFacilityStore');


var TeamStore = require('../../../stores/TeamStore');
var FacilityStore = require('../../../stores/FacilityStore');
var LeagueActions = require('../../../actions/LeagueActions');
var LeagueStore = require('../../../stores/LeagueStore');


var AvailabilityActions = require('../../../actions/AvailabilityActions');


var AddToComponent = require('../../navigation/AddToComponent');
var GameDatesInput = require('../../newPages/GameDatesInput');

var LeagueShowDetail = React.createClass({

  getInitialState: function(){

    return {
      teams: LeagueTeamStore.teams(this.props.item.id),
      facilities: LeagueFacilityStore.facilities(this.props.item.id),
      gameDates: {
        specific: this.props.item.specificAvailabilities || [],
        general:  this.props.item.generalAvailabilities || []
      }
    };
  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.leagueTeamStoreChange);
    this.leagueFacilityListener = LeagueFacilityStore.addListener(this.leagueFacilityStoreChange);
    this.leagueListener = LeagueStore.addListener(this.leagueChange);
  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
    this.leagueFacilityListener.remove();
    this.leagueListener.remove();

  },

  leagueTeamStoreChange: function(){
    this.setState({
      teams: LeagueTeamStore.teams(this.props.item.id)
    });
  },

  leagueFacilityStoreChange: function(){
    this.setState({
      facilities: LeagueFacilityStore.facilities(this.props.item.id)
    });
  },

  leagueChange: function(){

    var updatedLeague = LeagueStore.find(this.props.item.id);

    this.setState({
      gameDates: {
        specific: updatedLeague.specificAvailabilities || [],
        general: updatedLeague.generalAvailabilities || []
      }
    });

  },

  addTeam: function(teamId){
    LeagueActions.createLeagueTeam(this.props.item.id, teamId);
  },

  removeTeam: function(teamId){
    LeagueActions.destroyLeagueTeam(this.props.item.id, teamId);
  },

  addFacility: function(facilityId){
    LeagueActions.createLeagueFacility(this.props.item.id, facilityId);
  },

  removeFacility: function(facilityId){
    LeagueActions.destroyLeagueFacility(this.props.item.id, facilityId);
  },

  addNewGameDate: function(newGameDate){

    AvailabilityActions.attemptCreateAvailability(
      newGameDate,
      'League',
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

    var league = this.props.item;

    var teams = this.state.teams.map(function(teamId){
      return TeamStore.find(teamId);
    });

    var facilities = this.state.facilities.map(function(facilityId){
      return FacilityStore.find(facilityId);
    });

    var teamsList = teams.map(function(team){
      return (
        <div key={team.id}>
          <span> {team.name} </span>
          <div onClick={this.removeTeam.bind(this, team.id)}
            className='delete-from-list-button'> X </div>
        </div>)
    }, this);

    var facilitiesList = facilities.map(function(facility){
      return (
        <div key={facility.id}>
          <span> {facility.name} </span>
          <div onClick={this.removeFacility.bind(this, facility.id)}
            className='delete-from-list-button'> X </div>
        </div>)
    }, this);

    // debugger;


    var possibleTeamsToAdd =
      TeamStore.opposite(this.state.teams).
      map(function(teamId){
        return TeamStore.find(teamId);
      });

    var possibleFacilitiesToAdd =
      FacilityStore.opposite(this.state.facilities).
      map(function(facilityId){
        return FacilityStore.find(facilityId);
      });

    return (

      <div className="show-detail clear">

        <div className="show-basic-info">
          <div className="info-stat">
            {league.name}
          </div>
        </div>


        <div className="leagues-list">
          {teamsList}
        </div>


        <div className="add-to-menu">
          <AddToComponent
            makeAdd={this.addTeam}
            list={possibleTeamsToAdd}
            message={'Add a team'}
            item={'teams'} />
        </div>

        <div className="facilities-list">
          {facilitiesList}
        </div>

        <div className="add-to-menu">
          <AddToComponent
            makeAdd={this.addFacility}
            list={possibleFacilitiesToAdd}
            message={'Add a facility'}
            item={'facilities'} />
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

module.exports = LeagueShowDetail;
