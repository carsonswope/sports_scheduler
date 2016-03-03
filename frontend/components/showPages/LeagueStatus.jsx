var React = require('react');
var PropTypes = React.PropTypes;

var EventHelper = require('../../util/EventHelper');

var LeagueTeamStore = require('../../stores/LeagueTeamStore');
var EventStore = require('../../stores/EventStore');
var TeamStore = require('../../stores/TeamStore');

var LeagueStatus = React.createClass({

  getInitialState: function(){

    this.gamesCounts = {};
    this.matchupsCounts = {};

    var teamIds = LeagueTeamStore.teams(this.props.league.id);
    var teams = teamIds.map(function(teamId){
      return TeamStore.find(teamId);
    });

    var games = EventStore.filteredEvents({
      filterType: 'BY_LEAGUE',
      filterSpec: this.props.league.id
    });

    for (var i = 0; i < teams.length; i++) {
      teams[i].gamesCount = this.gamesCount(teams[i], games)
    }

    return({
      teams: teams,
      games: games
    });

  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.refresh);
  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
  },

  refresh: function(){
    var teamIds = LeagueTeamStore.teams(this.props.league.id);
    var teams = teamIds.map(function(teamId){
      return TeamStore.find(teamId);
    });

    var games = EventStore.filteredEvents({
      filterType: 'BY_LEAGUE',
      filterSpec: this.props.league.id
    });

    for (var i = 0; i < teams.length; i++) {
      teams[i].gamesCount = this.gamesCount(teams[i], games)
    }

    this.setState({
      teams: teams,
      games: games
    });
  },

  gamesCount(team, games){
    var count = 0;
    var teamId = team.id;

    for (var i = 0; i < games.length; i++) {
      if (games[i].team_1_id === teamId || games[i].team_2_id === teamId) {
        count += 1
      }
    }

    return count;
  },

  matchupsCount(team1, team2, games){
    var count = 0;
    var team_1_id = team1.id;
    var team_2_id = team2.id;

    for (var i = 0; i < games.length; i++) {
      if ((games[i].team_1_id === team_1_id || games[i].team_2_id === team_1_id)
            &&(games[i].team_1_id === team_2_id || games[i].team_2_id === team_2_id)){
        count += 1;
      }
    }

    var matchupString = team_1_id.toString() + ',' + team_2_id.toString();

    this.matchupsCounts[matchupString] = count;

    return count;

  },

  rows: function() {

    this.gamesCounts = {};
    this.matchupsCounts = {};

    return this.state.teams.map(function(team, i){
      return(
        <div className='add-component-option' key={i}
          style={{width: 'calc(100% - 20px)'}}>
          <div className='info-stat-text'
            style={{width: 100, overflow: 'hidden'}}>
            {team.name}
          </div>
          <div className='info-stat-text'
            style={{
              width: 80,
              color: team.gamesCount === this.props.league.numGames ?
                '#16174f' : '#963019'
            }}>
            {team.gamesCount}
          </div>
          {this.matchupsCountCols(i)}
        </div>
      );
    }, this);

  },

  matchupsCountCols: function(index) {

    var cols = []

    for (var i = this.state.teams.length - 1; i > index; i--) {
      cols.push(
        <div className='info-stat-text' key={i}
          style={{width: 30}}>
          {this.matchupsCount(
            this.state.teams[i],
            this.state.teams[index],
            this.state.games
          )}
        </div>
      )
    };

    return cols;
  },

  matchupsLabels: function() {

    var labels = [];

    for (var i = this.state.teams.length - 1; i > -1; i--) {
      labels.push(
        <div className='info-stat-label' key={i}
          style={{width: 30, padding: 0, overflow: 'hidden', whiteSpace: 'nowrap'}}>
          {this.state.teams[i].name}
        </div>
      );
    }

    return labels;

  },

  completionStatus: function() {

    var incompleteTeams = [];

    for (var i = 0; i < this.state.teams.length; i++) {
      if (this.state.teams[i].gamesCount !== this.props.league.numGames) {
        incompleteTeams.push(this.state.teams[i]);
      }
    }

    var matchupsMin;
    var matchupsMax;
    var count;
    var errors = [];
    var unscheduledGames = [];

    Object.keys(this.matchupsCounts).forEach(function(matchup){
      count = this.matchupsCounts[matchup];

      if (!matchupsMin || count < matchupsMin) {
        matchupsMin = count;
      }
      if (!matchupsMax || count > matchupsMax) {
        matchupsMax = count;
      }

    }, this)

    for (var i = 0; i < this.state.games.length; i++) {
      if (!EventHelper.isScheduled(this.state.games[i])) {
        unscheduledGames.push(this.state.games[i]);
      }
    }


    if (incompleteTeams.length) {
      errors.push('not all teams are getting the right number of games!');
    }

    if (matchupsMax - matchupsMin > 1) {
      errors.push('the distribution of matchups is uneven!');
    }

    if (unscheduledGames.length) {
      errors.push('some games have not been scheduled yet!');
    }

    if (!errors.length){
      return(
        <div className='info-stat'>
          <div className='info-stat-label'>
            everything looks good!
          </div>
        </div>
      );
    }

    return errors.map(function(error, i){
      return(
        <div className='info-stat' key={i}>
          <div className='info-stat-label'
            style={{color: '#963019', width: '100%'}}>
            {error}
          </div>
        </div>
      );

    });


  },

  render: function() {

    return (
      <div className='show-basic-info'>
        <div className='info-stat'>
          <div className='info-stat-label'
            style={{width: 80}}>
            stats:
          </div>
          <div className='info-stat-label'
            style={{width: 80}}>
            # games:
          </div>
          {this.matchupsLabels()}
        </div>
        {this.rows()}
        {this.completionStatus()}
      </div>
    );
  }

});

module.exports = LeagueStatus;
