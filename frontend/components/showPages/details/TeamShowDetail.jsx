var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueStore = require("../../../stores/LeagueStore");
var LeagueActions = require('../../../actions/LeagueActions');

var AddToComponent = require('../../navigation/AddToComponent');

var TeamShowDetail = React.createClass({

  getInitialState: function(){


    return {
      leagues: LeagueTeamStore.leagues(this.props.item.id)
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
      leagues: LeagueTeamStore.leagues(this.props.item.id)
    });
  },

  addToLeague: function(leagueId){

    LeagueActions.createLeagueTeam(leagueId, this.props.item.id);

  },

  removeFromLeague: function(leagueId){
    LeagueActions.destroyLeagueTeam(leagueId, this.props.item.id);
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




      </div>
    );
  }

});

module.exports = TeamShowDetail;
