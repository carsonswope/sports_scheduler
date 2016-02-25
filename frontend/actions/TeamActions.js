var AppDispatcher = require('../dispatcher/Dispatcher');
var TeamApi = require('../util/TeamApi');
var TeamConstants = require('../constants/TeamConstants');
var AvailabilityHelper = require('../util/AvailabilityHelper');

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

  var t = team['team'];

  var teamParams = {
    name: t.name,
    contact_name: t.contactName,
    email: t.email,
    phone: t.phone,
    game_dates: {
      general: [],
      specific: []
    }
  }

  if (t.gameDates.general) {
    teamParams.game_dates['general'] =
      AvailabilityHelper.generalDatesMap(t.gameDates.general);
  }

  if (t.gameDates.specific) {
    teamParams.game_dates['specific'] =
      AvailabilityHelper.specificDatesMap(t.gameDates.specific);
  }

  debugger;

  TeamApi.attemptCreateTeam(teamParams);
};

exports.receiveCreateResponse = function(team) {

  AppDispatcher.dispatch({
    actionType: TeamConstants.actions.ADD_TEAM,
    team: team
  });
};

exports.attemptDestroyTeam = function(teamId) {
  TeamApi.attemptDestroy(teamId);
};

exports.receiveDestroyedTeam = function(team) {

  AppDispatcher.dispatch({
    actionType: TeamConstants.actions.REMOVE_TEAM,
    team: team
  });
}
