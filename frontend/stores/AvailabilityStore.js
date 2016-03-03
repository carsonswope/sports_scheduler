var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;

var AvailabilityConstants = require('../constants/AvailabilityConstants');

var _availabilities = {
  League: {},
  Team: {},
  Facility: {}
};

var AvailabilityStore = new Store(AppDispatcher);

AvailabilityStore.receive = function(availabilitiesList){

  var itemType = availabilitiesList.itemType;
  var itemId = availabilitiesList.itemId;
  var list = availabilitiesList.availabilities;

  debugger;

  _availabilities[itemType][itemId] = list;

  AvailabilityStore.__emitChange();

};

AvailabilityStore.handleAddedAvailability = function(availability){

  var timeSlots = _availabilities[availability.resourceType];
  delete timeSlots[availability.resourceId];
  AvailabilityStore.__emitChange();

};

AvailabilityStore.handleRemovedAvailability = function(availability){

  var timeSlots = _availabilities[availability.resourceType];
  delete timeSlots[availability.resourceId];
  AvailabilityStore.__emitChange();

};

AvailabilityStore.findTimeSlots = function(resourceType, resourceId){

  return _availabilities[resourceType][resourceId];

};

AvailabilityStore.__onDispatch = function(payload){

  switch (payload.actionType) {
    case AvailabilityConstants.actions.RECEIVE_LIST:
      AvailabilityStore.receive(payload.list);
      break;
    case AvailabilityConstants.actions.ADD_AVAILABILITY:
      AvailabilityStore.handleAddedAvailability(payload.availability);
      break;
    case AvailabilityConstants.actions.REMOVE_AVAILABILITY:
      AvailabilityStore.handleRemovedAvailability(payload.availability);
      break;
  }
};

module.exports = AvailabilityStore;
