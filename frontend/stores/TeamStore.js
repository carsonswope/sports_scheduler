var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var TeamConstants = require('../constants/TeamConstants');

var _teams = {};
var TeamStore = new Store(AppDispatcher);

TeamStore.all = function() {
  return Object.keys(_teams).map(function(i){
    return _teams[i];
  });
};

TeamStore.opposite = function(ids) {

  return Object.keys(_teams).filter(function(i){
    return ids.indexOf(parseInt(i)) === -1
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

TeamStore.getMatching = function(searchString){
  var string = searchString.toLowerCase();
  var keys = Object.keys(_teams).filter(function(i){
    return (
      _teams[i].name.toLowerCase().indexOf(string) > -1  ||
      _teams[i].email.toLowerCase().indexOf(string) > -1 ||
      _teams[i].contactName.toLowerCase().indexOf(string) > -1 ||
      _teams[i].phone.toLowerCase().indexOf(string) > -1
    );
  });

  // debugger;

  return keys.map(function(i){ return _teams[i]; });

};

TeamStore.addTeam = function(team) {
  _teams[team.id] = team;
  TeamStore.__emitChange();
};

TeamStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case TeamConstants.actions.RESET_TEAMS_LIST:
      TeamStore.resetTeamsList(payload.teams);
      break;
    case TeamConstants.actions.ADD_TEAM:
      TeamStore.addTeam(payload.team);
      break;
  }
};

module.exports = TeamStore;
