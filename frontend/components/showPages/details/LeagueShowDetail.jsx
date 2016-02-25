var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueFacilityStore = require('../../../stores/LeagueFacilityStore');

var TeamStore = require('../../../stores/TeamStore');
var FacilityStore = require('../../../stores/FacilityStore');
var LeagueActions = require('../../../actions/LeagueActions');

var AddToComponent = require('../../navigation/AddToComponent');

var LeagueShowDetail = React.createClass({

  getInitialState: function(){

    return {
      teams: LeagueTeamStore.teams(this.props.item.id),
      facilities: LeagueFacilityStore.facilities(this.props.item.id)
    };
  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.leagueTeamStoreChange);
    this.leagueFacilityListener = LeagueFacilityStore.addListener(this.leagueFacilityStoreChange);

  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
    this.leagueFacilityListener.remove();
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

      debugger;

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


      </div>
    );
  }

});

module.exports = LeagueShowDetail;
