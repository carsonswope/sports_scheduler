var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var TeamConstants = require('../constants/TeamConstants');

var _teams = {};
var TeamStore = new Store(AppDispatcher);

TeamStore.all = function() {
  return Object.keys(_teams).map(function(i){
    return _teams[i];
  });
};

TeamStore.find = function(id) {
  return _teams[id];
};

TeamStore.resetTeamsList = function(teams){
  _teams = {};

  if (teams[0]){
    teams.forEach(function(team){
      _teams[team.id] = team;
    });
  }

  TeamStore.__emitChange();
};

TeamStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case TeamConstants.actions.RESET_TEAMS_LIST:
    TeamStore.resetTeamsList(payload.teams);
    break;
  }
};

module.exports = TeamStore;
