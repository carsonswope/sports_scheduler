var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../../../stores/LeagueFacilityStore');


var TeamStore = require('../../../stores/TeamStore');
var FacilityStore = require('../../../stores/FacilityStore');
var LeagueActions = require('../../../actions/LeagueActions');
var LeagueStore = require('../../../stores/LeagueStore');

var LeagueStatus = require('../LeagueStatus');

var AvailabilityActions = require('../../../actions/AvailabilityActions');

var BasicInfoDiv = require('./BasicInfoDiv');

var CurrentMembersList = require('../../navigation/CurrentMembersList');
var AddToComponent = require('../../navigation/AddToComponent');
var GameDatesInput = require('../../newPages/GameDatesInput');
var MembershipsShow = require('../../navigation/MembershipsShow');

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

    // debugger;

    AvailabilityActions.attemptCreateAvailability(
      newGameDate,
      'League',
      this.props.item.id
    );
  },

  removeGameDate: function(dateType, index){

    var gameDates = this.state.gameDates;
    var dateToRemoveId;

    if (dateType === 'SPECIFIC') {
      dateToRemoveId = gameDates.specific[index].id;
        } else{
      dateToRemoveId = gameDates.general[index].id;
    }

    AvailabilityActions.attemptDestroyAvailability(dateType, dateToRemoveId)
  },

  getTeamsList: function(){
    return this.state.teams.map(function(teamId){
      return TeamStore.find(teamId);
    });
  },

  getFieldsList: function(){
    return this.state.facilities.map(function(facilityId){
      return FacilityStore.find(facilityId);
    });
  },

  getTeamsListHeight: function(){
    var listHeight = ((this.state.teams.length+1) * 28);
    if (listHeight > 250) {
      return 250;
    } else if (listHeight < 115) {
      return 115;
    } else {
      return listHeight;
    }
  },

  getFieldsListHeight: function(){
    return 78;
  },

  render: function() {
    var league = this.props.item;

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

    var statsList = [{
      label: 'league name:',
      text: this.props.item.name
    },{
      label: 'number of games per team:',
      text: this.props.item.numGames
    },{
      label: 'game duration: ',
      text: this.props.item.gameDuration
    }];

    return (

      <div className="show-detail clear">

        <BasicInfoDiv stats={statsList}
          remove={this.removeTeam} />

        <MembershipsShow
          membershipName={'member teams:'}
          itemsList={this.getTeamsList()}
          removeItem={this.removeTeam}
          addItem={this.addTeam}
          possibleItemsToAdd={possibleTeamsToAdd}
          addMessage='Add a team'
          itemName='teams'
          height={this.getTeamsListHeight()} />

        <MembershipsShow
          membershipName={'fields list:'}
          itemsList={this.getFieldsList()}
          removeItem={this.removeFacility}
          addItem={this.addFacility}
          possibleItemsToAdd={possibleFacilitiesToAdd}
          addMessage='Add a field'
          itemName='facilities'
          height={this.getFieldsListHeight()} />

        <GameDatesInput
          dates={this.state.gameDates}
          update={this.addNewGameDate}
          remove={this.removeGameDate}
          weeklyPlus={'Weekly game dates'}
          specificPlus={'Specific additions'}
          specificMinus={'Specific exceptions'}/>


        <LeagueStatus league={league} />
        
      </div>
    );
  }

});

module.exports = LeagueShowDetail;
