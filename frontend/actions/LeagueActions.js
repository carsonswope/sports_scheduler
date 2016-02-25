var AppDispatcher = require('../dispatcher/Dispatcher');
var LeagueApi = require('../util/LeagueApi');
var LeagueConstants = require('../constants/LeagueConstants');
var AvailabilityHelper = require('../util/AvailabilityHelper');

// League Actions

exports.fetch = function() {
  LeagueApi.fetch();
};

exports.receiveFetch = function(leagues) {

  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.RESET_LEAGUES_LIST,
    leagues: leagues
  });
};

exports.createLeague = function(league) {

  debugger;

  var l = league['league']

  var leagueParams = {
    name: l.name,
    num_games: l.numGames,
    facilities: l.facilities,
    event_duration: l.gameDuration,
    game_dates: {
      general: [],
      specific: []
    }
  }

  if (l.gameDates.general) {
    leagueParams.game_dates['general'] =
      AvailabilityHelper.generalDatesMap(l.gameDates.general);
  }

  if (l.gameDates.specific) {
    leagueParams.game_dates['specific'] =
      AvailabilityHelper.specificDatesMap(l.gameDates.specific);
  }

  debugger;

  LeagueApi.attemptCreateLeague(leagueParams);
};

exports.receiveCreateResponse = function(league) {
  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.ADD_LEAGUE,
    league: league
  });
};

exports.createLeagueTeam = function(leagueId, teamId) {
  LeagueApi.attemptCreateLeagueTeam(leagueId, teamId);
};

exports.receiveLeagueTeam = function(response) {
  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.ADD_LEAGUE_TEAM,
    pair: response
  });
}

exports.destroyLeagueTeam = function(leagueId, teamId) {
  LeagueApi.attemptDestroyLeagueTeam(leagueId, teamId);
};

exports.receiveDestroyedLeagueTeam = function(response) {

  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.REMOVE_LEAGUE_TEAM,
    pair: response
  });
}

exports.createLeagueFacility = function(leagueId, facilityId) {
  LeagueApi.attemptCreateLeagueFacility(leagueId, facilityId);
};

exports.receiveLeagueFacility = function(response) {
  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.ADD_LEAGUE_FACILITY,
    pair: response
  });
}

exports.destroyLeagueFacility = function(leagueId, facilityId) {
  LeagueApi.attemptDestroyLeagueFacility(leagueId, facilityId);
};
exports.receiveDestroyedLeagueFacility = function(response) {

  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.REMOVE_LEAGUE_FACILITY,
    pair: response
  });
};



exports.attemptDestroyLeague = function(leagueId) {
  LeagueApi.attemptDestroy(leagueId);
};

exports.receiveDestroyedLeague = function(league) {

  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.REMOVE_LEAGUE,
    league: league
  });
}
