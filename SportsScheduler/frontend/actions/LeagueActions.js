var AppDispatcher = require('../dispatcher/dispatcher');
var LeagueApi = require('../util/LeagueApi');
var LeagueConstants = require('../constants/LeagueConstants');

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
      l.gameDates.general.map(function(genDate){
        return({
          first_date: genDate.startDate,
          last_date: genDate.endDate,
          time_start: genDate.startTime,
          time_end: genDate.endTime,
          positive: true,
          day_of_week: genDate.dayOfWeek
        });
    });

    debugger;
  }

  if (l.gameDates.specific) {

    leagueParams.game_dates['specific'] =
      l.gameDates.specific.map(function(spcDate){
        return({
          date: spcDate.date,
          time_start: spcDate.startTime,
          time_end: spcDate.endTime,
          positive: true,
        });
    });

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
