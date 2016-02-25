var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var TeamStore = require('../../../stores/TeamStore');
var LeagueActions = require('../../../actions/LeagueActions');

var AddToComponent = require('../../navigation/AddToComponent');

var LeagueShowDetail = React.createClass({

  getInitialState: function(){

    return {
      teams: LeagueTeamStore.teams(this.props.item.id)
    };
  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.leagueTeamStoreChange);
  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
  },

  leagueTeamStoreChange: function(){
    this.setState({
      teams: LeagueTeamStore.teams(this.props.item.id)
    });
  },

  addTeam: function(teamId){

    LeagueActions.createLeagueTeam(this.props.item.id, teamId);

  },

  removeTeam: function(teamId){
    LeagueActions.destroyLeagueTeam(this.props.item.id, teamId);
  },

  render: function() {
    var league = this.props.item;

    var teams = this.state.teams.map(function(teamId){
      return TeamStore.find(teamId);
    });

    var teamsList = teams.map(function(team){
      return (
        <div key={team.id}>
          <span> {team.name} </span>
          <div onClick={this.removeTeam.bind(this, team.id)}
            className='delete-from-list-button'> X </div>
        </div>)
    }, this);

    // debugger;


    var possibleTeamsToAdd =
      TeamStore.opposite(this.state.teams).
      map(function(teamId){
        return TeamStore.find(teamId);
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

      </div>
    );
  }

});

module.exports = LeagueShowDetail;
