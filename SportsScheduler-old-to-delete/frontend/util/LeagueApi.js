var LeagueActions = require('../actions/LeagueActions');

exports.fetch = function() {
  $.ajax({
    url: 'api/leagues',
    type: 'GET',
    dateType: 'json',
    success: function(response){
      LeagueActions.receiveFetch(response);
    }
  });
};

exports.attemptCreateLeague = function(league) {

  $.ajax({
    url: 'api/leagues',
    type: 'POST',
    dataType: 'json',
    data: {league: league},
    success: function(response){
      LeagueActions.receiveCreateResponse(response);
    }
  });
};

exports.attemptCreateLeagueTeam = function(leagueId, teamId) {

  $.ajax({
    url: 'api/league_teams',
    type: 'POST',
    dataType: 'json',
    data: {league_team: {league_id: leagueId, team_id: teamId}},
    success: function(response){
      LeagueActions.receiveLeagueTeam(response);
    }
  });

};

exports.attemptDestroyLeagueTeam = function(leagueId, teamId) {

  $.ajax({
    url: 'api/league_teams/0',
    type: 'DELETE',
    dataType: 'json',
    data: {league_team: {league_id: leagueId, team_id: teamId}},
    success: function(response){
      LeagueActions.receiveDestroyedLeagueTeam(response);
    }
  });

};
