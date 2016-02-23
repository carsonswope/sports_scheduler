var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var FacilityConstants = require('../constants/FacilityConstants');
var UserConstants = require('../constants/UserConstants');


var _facilities = {};

var FacilityStore = new Store(AppDispatcher);

FacilityStore.all = function() {
  return Object.keys(_facilities).map(function(i){
    return _facilities[i];
  });
};

FacilityStore.find = function(id) {
  return _facilities[id];
};

FacilityStore.resetFacilitiesList = function(facilities){
  _facilities = {};

  if (facilities[0]){
    facilities.forEach(function(facility){
      _facilities[facility.id] = facility;
    });
  } else {
    _facilities = {};
  }

  FacilityStore.__emitChange();
};

FacilityStore.__onDispatch = function(payload){

  switch (payload.actionType) {
    case FacilityConstants.actions.RESET_FACILITIES_LIST:
      FacilityStore.resetFacilitiesList(payload.facilities);
      break;
  }

};

module.exports = FacilityStore;
