var AppDispatcher = require('../dispatcher/dispatcher');
var TeamApi = require('../util/TeamApi');
var TeamConstants = require('../constants/TeamConstants');

//TeamActions

exports.fetch = function() {
  TeamApi.fetch();
};

exports.receiveFetch = function(teams) {
  AppDispatcher.dispatch({
    actionType: TeamConstants.actions.RESET_TEAMS_LIST,
    teams: teams
  });
};

exports.createTeam = function(team) {
  TeamApi.attemptCreateTeam(team);
};

exports.receiveCreateResponse = function(team) {

  debugger;

  AppDispatcher.dispatch({
    actionType: TeamConstants.actions.ADD_TEAM,
    team: team
  });
};
