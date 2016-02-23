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
