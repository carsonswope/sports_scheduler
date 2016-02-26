var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var LeagueConstants = require('../constants/LeagueConstants');
var AvailabilityConstants = require('../constants/AvailabilityConstants');

var StoreHelper = require('../util/StoreHelper');

var _leagues = {};
var LeagueStore = new Store(AppDispatcher);

LeagueStore.all = function() {
  return StoreHelper.all(_leagues);
};

LeagueStore.opposite = function(ids) {
  return StoreHelper.opposite(_leagues, ids);
};

LeagueStore.find = function(id) {
  return _leagues[id];
};

LeagueStore.getMatching = function(searchString){
  var string = searchString.toLowerCase();
  var keys = Object.keys(_leagues).filter(function(i){
    return (
      _leagues[i].name.toLowerCase().indexOf(string) > -1
    );
  });

  return keys.map(function(i){ return _leagues[i]; })

};

LeagueStore.resetLeaguesList = function(leagues){

  _leagues = {};

  if (leagues[0]){
    leagues.forEach(function(league){
      _leagues[league.id] = league;
    })
  }

  LeagueStore.__emitChange();
};

LeagueStore.addLeague = function(league) {
  _leagues[league.id] = league;
  LeagueStore.__emitChange();
};

LeagueStore.removeLeague = function(league) {
  delete _leagues[league.id];
  LeagueStore.__emitChange();
};

LeagueStore.removeAvailability = function(a) {
  if (a.resourceType === 'League') {

    var league = _leagues[a.resourceId];
    if (a.availType === 'GENERAL'){
      var list = league.generalAvailabilities;
    } else {
      var list = league.specificAvailabilities;
    }

    for (var i = 0; i < list.length; i++) {
      if (list[i].id === a.availId) {
        list.splice(i, 1);
        break;
      }
    }

    LeagueStore.__emitChange();

  }
};

LeagueStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case LeagueConstants.actions.RESET_LEAGUES_LIST:
      LeagueStore.resetLeaguesList(payload.leagues);
      break;
    case LeagueConstants.actions.ADD_LEAGUE:
      LeagueStore.addLeague(payload.league);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE:
      LeagueStore.removeLeague(payload.league);
      break;
    case AvailabilityConstants.actions.REMOVE_AVAILABILITY:
      LeagueStore.removeAvailability(payload.availability);
      break;

  }
};

module.exports = LeagueStore;
