var AppDispatcher = require('../dispatcher/Dispatcher');
var FacilityApi = require('../util/FacilityApi');
var FacilityConstants = require('../constants/FacilityConstants');

exports.fetch = function() {
  FacilityApi.fetch();
};

exports.receiveFetch = function(facilities) {
  AppDispatcher.dispatch({
    actionType: FacilityConstants.actions.RESET_FACILITIES_LIST,
    facilities: facilities
  });
};

exports.createFacility = function(facility) {
  FacilityApi.attemptCreateFacility(facility);
};

exports.receiveCreateResponse = function(facility) {
  AppDispatcher.dispatch({
    actionType: FacilityConstants.actions.ADD_FACILITY,
    facility: facility
  });
};

exports.attemptDestroyFacility = function(facilityId) {
  FacilityApi.attemptDestroy(facilityId);
};

exports.receiveDestroyedFacility = function(facility) {

  debugger;

  AppDispatcher.dispatch({
    actionType: FacilityConstants.actions.REMOVE_FACILITY,
    facility: facility
  });
};
