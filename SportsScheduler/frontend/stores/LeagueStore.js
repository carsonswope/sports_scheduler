var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var LeagueConstants = require('../constants/LeagueConstants');

var _leagues = {};
var LeagueStore = new Store(AppDispatcher);

LeagueStore.all = function() {
  return Object.keys(_leagues).map(function(i){
    return _leagues[i];
  });
};

LeagueStore.find = function(id) {
  return _leagues[id];
};

LeagueStore.resetLeaguesList = function(leagues){
  _leagues = {};

  if (leagues[0]){
    leagues.forEach(function(league){
      _leagues[league.id] = league;
    });
  }

  LeagueStore.__emitChange();
};

LeagueStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case LeagueConstants.actions.RESET_LEAGUES_LIST:
    LeagueStore.resetLeaguesList(payload.leagues);
    break;
  }
};

module.exports = LeagueStore;
