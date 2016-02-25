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


exports.attemptDestroy = function(id) {
  $.ajax({
    url: 'api/leagues/' + id,
    type: 'DELETE',
    dataType: 'json',
    success: function(response){
      LeagueActions.receiveDestroyedLeague(response);
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

exports.attemptCreateLeagueFacility = function(leagueId, facilityId) {

  $.ajax({
    url: 'api/league_facilities',
    type: 'POST',
    dataType: 'json',
    data: {league_facility: {league_id: leagueId, facility_id: facilityId}},
    success: function(response){
      LeagueActions.receiveLeagueFacility(response);
    }
  });

};

exports.attemptDestroyLeagueFacility = function(leagueId, facilityId) {

  $.ajax({
    url: 'api/league_facilities/0',
    type: 'DELETE',
    dataType: 'json',
    data: {league_facility: {league_id: leagueId, facility_id: facilityId}},
    success: function(response){
      LeagueActions.receiveDestroyedLeagueFacility(response);
    }
  });

};
