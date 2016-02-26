var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var TeamConstants = require('../constants/TeamConstants');
var AvailabilityConstants = require('../constants/AvailabilityConstants');
var StoreHelper = require('../util/StoreHelper');


var _teams = {};
var TeamStore = new Store(AppDispatcher);

TeamStore.all = function() {
  return StoreHelper.all(_teams);
};

TeamStore.opposite = function(ids) {
  return StoreHelper.opposite(_teams, ids);
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

TeamStore.removeTeam = function(team) {
  delete _teams[team.id];
  TeamStore.__emitChange();
};

TeamStore.addAvailability = function(a) {
  StoreHelper.addAvailability(a, 'Team', _teams);
  TeamStore.__emitChange();
};

TeamStore.removeAvailability = function(a) {
  StoreHelper.removeAvailability(a, 'Team', _teams);
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
    case TeamConstants.actions.REMOVE_TEAM:
      TeamStore.removeTeam(payload.team);
      break;
    case AvailabilityConstants.actions.REMOVE_AVAILABILITY:
      TeamStore.removeAvailability(payload.availability);
      break;
    case AvailabilityConstants.actions.ADD_AVAILABILITY:
      TeamStore.addAvailability(payload.availability);
      break;
  }
};

module.exports = TeamStore;
