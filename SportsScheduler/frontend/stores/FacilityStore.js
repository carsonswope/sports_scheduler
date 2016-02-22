var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var FacilityConstants = require('../constants/FacilityConstants');

var FacilityStore = new Store(AppDispatcher);

var _facilities = {};

FacilityStore.all = function() {


  return Object.keys(_facilities).map(function(i){
    return _facilities[i];
  });

}

FacilityStore.find = function(id) {
  return _facilities[id];
}


FacilityStore.resetFacilitiesList = function(facilities){

  _facilities = {};
  facilities.forEach(function(facility){
    _facilities[facility.id] = facility;
  });

  FacilityStore.__emitChange();
}

FacilityStore.__onDispatch = function(payload){

  switch (payload.actionType) {
    case FacilityConstants.RESET_FACILITIES_LIST:
      FacilityStore.resetFacilitiesList(payload.facilities);
      break;
  }

}

module.exports = FacilityStore;
