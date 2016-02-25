var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var FacilityConstants = require('../constants/FacilityConstants');
var UserConstants = require('../constants/UserConstants');
var StoreHelper = require('../util/StoreHelper');

var _facilities = {};

var FacilityStore = new Store(AppDispatcher);

FacilityStore.all = function() {
  return StoreHelper.all(_facilities);
};

FacilityStore.opposite = function(ids) {
  return StoreHelper.opposite(_facilities, ids);
};

FacilityStore.find = function(id) {
  return _facilities[id];
};

FacilityStore.getMatching = function(searchString){
  var string = searchString.toLowerCase();
  var keys = Object.keys(_facilities).filter(function(i){
    return (
      _facilities[i].name.toLowerCase().indexOf(string) > -1
    );
  });

  return keys.map(function(i){ return _facilities[i]; });

}

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


FacilityStore.addFacility = function(facility) {
  _facilities[facility.id] = facility;
  FacilityStore.__emitChange();
};


FacilityStore.removeFacility = function(facility) {

  debugger;

  delete _facilities[facility.id];
  FacilityStore.__emitChange();
};


FacilityStore.__onDispatch = function(payload){

  switch (payload.actionType) {
    case FacilityConstants.actions.RESET_FACILITIES_LIST:
      FacilityStore.resetFacilitiesList(payload.facilities);
      break;
    case FacilityConstants.actions.ADD_FACILITY:
      FacilityStore.addFacility(payload.facility);
      break;
    case FacilityConstants.actions.REMOVE_FACILITY:
      FacilityStore.removeFacility(payload.facility);
      break;
  }

};

module.exports = FacilityStore;
