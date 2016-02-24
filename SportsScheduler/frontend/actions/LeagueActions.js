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
  LeagueApi.attemptCreateLeague(league);
};

exports.receiveCreateResponse = function(league) {
  AppDispatcher.dispatch({
    actionType: LeagueConstants.actions.ADD_LEAGUE,
    league: league
  });
};
