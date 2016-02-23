var AppDispatcher = require('../dispatcher/dispatcher');
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
