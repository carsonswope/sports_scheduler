var AppDispatcher = require('../dispatcher/Dispatcher');
var EventApi = require('../util/EventApi');
var EventConstants = require('../constants/EventConstants');

// EventActions

exports.fetch = function() {
  EventApi.fetch();
};

exports.receiveFetch = function(events) {

  AppDispatcher.dispatch({
    actionType: EventConstants.actions.RESET_EVENTS_LIST,
    events: events
  });
};

exports.attemptReschedule = function(event) {

  EventApi.attemptPatch(event);
};

exports.receivePatchedEvent = function(event) {
  AppDispatcher.dispatch({
    actionType: EventConstants.actions.UPDATE_EVENT,
    event: event
  });
};

exports.attemptDestroy = function(eventId) {
  EventApi.attemptDestroy(eventId);
};

exports.receiveDestroyedEvent = function(event) {
  AppDispatcher.dispatch({
    actionType: EventConstants.actions.DELETE_EVENT,
    event: event
  });
};

exports.attemptCreate = function(event) {

  EventApi.attemptCreate(event);

};

exports.receiveCreatedEvent = function(event) {

  AppDispatcher.dispatch({
    actionType: EventConstants.actions.ADD_EVENT,
    event: event
  });
};
