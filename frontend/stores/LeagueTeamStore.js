var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var LeagueConstants = require('../constants/LeagueConstants');
var TeamConstants = require('../constants/TeamConstants');
var StoreHelper = require('../util/StoreHelper');

var _memberships = [];

var LeagueTeamStore = new Store(AppDispatcher);

LeagueTeamStore.all = function() {
  return _memberships.slice();
};

LeagueTeamStore.leagues = function(teamId) {
  var leagues = [];
  _memberships.forEach(function(membership){
    if (teamId === membership.teamId) {
      leagues.push(membership.leagueId);
    }
  });
  return leagues;
};

LeagueTeamStore.teams = function(leagueId) {
  var teams = [];
  _memberships.forEach(function(membership){
    if (leagueId === membership.leagueId) {
      teams.push(membership.teamId);
    }
  });

  return teams;
};

LeagueTeamStore.resetListFromLeagues = function(newList) {
  _memberships = [];

  newList.forEach(function(league){
    league.teams.forEach(function(teamId){
      _memberships.push({
        leagueId: league.id,
        teamId: teamId
      });
    })
  });

  LeagueTeamStore.__emitChange();
};

LeagueTeamStore.addLeagueTeam = function(pair) {
  if (!_memberships.some(function(membership){
      return (membership.leagueId === pair.leagueId &&
              membership.teamId === pair.teamId);
      })) {

        _memberships.push({
          leagueId: pair.leagueId,
          teamId: pair.teamId
        });

  }

  LeagueTeamStore.__emitChange();
}

LeagueTeamStore.removeLeagueTeam = function(pair) {
  var index = -1;
  for (var i = 0; i < _memberships.length; i++) {
    if (_memberships[i].leagueId === pair.leagueId &&
        _memberships[i].teamId === pair.teamId) {
      index = i;
      break;
    }
  }

  _memberships.splice(i, 1);

  LeagueTeamStore.__emitChange();

}

LeagueTeamStore.removeLeague = function(league) {

  // _memberships = _memberships.filter(function(membership){
  //   return membership.leagueId !== league.id;
  // });

  _memberships = StoreHelper.removeJoinTableReferences(
    _memberships,
    'leagueId',
    league.id
  )

  LeagueTeamStore.__emitChange();

};

LeagueTeamStore.removeTeam = function(team) {

  _memberships = StoreHelper.removeJoinTableReferences(
    _memberships,
    'teamId',
    team.id
  )

  LeagueTeamStore.__emitChange();

};


LeagueTeamStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case LeagueConstants.actions.RESET_LEAGUES_LIST:
      LeagueTeamStore.resetListFromLeagues(payload.leagues);
      break;
    case LeagueConstants.actions.ADD_LEAGUE_TEAM:
      LeagueTeamStore.addLeagueTeam(payload.pair);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE_TEAM:
      LeagueTeamStore.removeLeagueTeam(payload.pair);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE:
      LeagueTeamStore.removeLeague(payload.league);
      break;
    case TeamConstants.actions.REMOVE_TEAM:
      LeagueTeamStore.removeTeam(payload.team);
      break;
  }
};

module.exports = LeagueTeamStore;
