var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var LeagueConstants = require('../constants/LeagueConstants');
var FacilityConstants = require('../constants/FacilityConstants');
var StoreHelper = require('../util/StoreHelper');

var _memberships = [];

var LeagueFacilityStore = new Store(AppDispatcher);

LeagueFacilityStore.all = function() {
  return _memberships.slice();
};

LeagueFacilityStore.leagues = function(facilityId) {
  var leagues = [];
  _memberships.forEach(function(membership){
    if (facilityId === membership.facilityId) {
      leagues.push(membership.leagueId);
    }
  });
  return leagues;
};

LeagueFacilityStore.facilities = function(leagueId) {
  var facilities = [];
  _memberships.forEach(function(membership){
    if (leagueId === membership.leagueId) {
      facilities.push(membership.facilityId);
    }
  });
  return facilities;
};

LeagueFacilityStore.resetListFromLeagues = function(newList) {
  _memberships = [];

  newList.forEach(function(league){
    league.facilities.forEach(function(facilityId){
      _memberships.push({
        leagueId: league.id,
        facilityId: facilityId
      });
    })
  });

  LeagueFacilityStore.__emitChange();
};

LeagueFacilityStore.addLeagueFacility = function(pair) {
  if (!_memberships.some(function(membership){
      return (membership.leagueId === pair.leagueId &&
              membership.facilityId === pair.facilityId);
      })) {

        _memberships.push({
          leagueId: pair.leagueId,
          facilityId: pair.facilityId
        });

  }

  LeagueFacilityStore.__emitChange();
}

LeagueFacilityStore.removeLeagueFacility = function(pair) {
  var index = -1;
  for (var i = 0; i < _memberships.length; i++) {
    if (_memberships[i].leagueId === pair.leagueId &&
        _memberships[i].facilityId === pair.facilityId) {
      index = i;
      break;
    }
  }

  _memberships.splice(i, 1);

  LeagueFacilityStore.__emitChange();

}

LeagueFacilityStore.removeLeague = function(league) {

  // _memberships = _memberships.filter(function(membership){
  //   return membership.leagueId !== league.id;
  // });

  _memberships = StoreHelper.removeJoinTableReferences(
    _memberships,
    'leagueId',
    league.id
  );

  LeagueFacilityStore.__emitChange();

};

LeagueFacilityStore.removeFacility = function(facility) {

  _memberships = StoreHelper.removeJoinTableReferences(
    _memberships,
    'facilityId',
    facility.id
  );

  LeagueFacilityStore.__emitChange();

};

LeagueFacilityStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case LeagueConstants.actions.RESET_LEAGUES_LIST:
      LeagueFacilityStore.resetListFromLeagues(payload.leagues);
      break;
    case LeagueConstants.actions.ADD_LEAGUE_FACILITY:
      LeagueFacilityStore.addLeagueFacility(payload.pair);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE_FACILITY:
      LeagueFacilityStore.removeLeagueFacility(payload.pair);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE:
      LeagueFacilityStore.removeLeague(payload.league);
      break;
    case FacilityConstants.actions.REMOVE_FACILITY:
      LeagueFacilityStore.removeFacility(payload.facility);
      break;
  }
};

module.exports = LeagueFacilityStore;
